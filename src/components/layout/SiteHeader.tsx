"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import profileImage from "@/src/images/history/miguelmarketer_.png";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";
import { getSiteData } from "@/content/siteData";
import type { Locale } from "@/src/lib/i18n";
import { getLocalizedPath } from "@/src/lib/routes";

interface SiteHeaderProps {
  locale: Locale;
}

export function SiteHeader({ locale }: SiteHeaderProps) {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();
  const siteData = getSiteData(locale);
  const homePath = getLocalizedPath(locale, "home");
  const copy =
    locale === "en"
      ? {
          homeAria: "Back to home",
          navLabel: "Primary navigation",
          talk: "Let's talk",
          relevantExperience: "Relevant Experience",
        }
      : {
          homeAria: "Volver al inicio",
          navLabel: "Navegación principal",
          talk: "Hablemos",
          relevantExperience: "Experiencia Relevante",
        };

  const navItems = [
    { href: getLocalizedPath(locale, "relevantExperience"), label: copy.relevantExperience },
  ];

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (pathname !== homePath) {
      setShowProfile(false);
      return;
    }
    let active = true;
    let observer: IntersectionObserver | null = null;
    let retryTimer: ReturnType<typeof setTimeout> | null = null;
    let attempts = 0;
    const maxAttempts = 12;

    const connectObserver = () => {
      if (!active) return;

      const target = document.getElementById("hero-profile-anchor");
      if (!target) {
        setShowProfile(false);
        if (attempts < maxAttempts) {
          attempts += 1;
          retryTimer = setTimeout(connectObserver, 120);
        }
        return;
      }

      observer = new IntersectionObserver(
        ([entry]) => {
          if (!active) return;
          setShowProfile(!entry.isIntersecting);
        },
        {
          threshold: 0.25,
          rootMargin: "-74px 0px 0px 0px",
        },
      );

      observer.observe(target);
    };

    connectObserver();

    return () => {
      active = false;
      if (observer) observer.disconnect();
      if (retryTimer) clearTimeout(retryTimer);
    };
  }, [homePath, pathname]);

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Link
          href={getLocalizedPath(locale, "home")}
          className="site-header__brand"
          aria-label={copy.homeAria}
        >
          <img
            src="/logos/miguelmarketer-white.svg"
            alt=""
            aria-hidden="true"
            className="site-header__brand-logo"
          />
          <span className="site-header__brand-text">
            <span className="site-header__brand-name">{siteData.person.displayName}</span>
            <span className="site-header__brand-separator"> | </span>
            <span className="site-header__brand-role">{siteData.person.jobTitle}</span>
          </span>
        </Link>

        <nav className="site-header__nav site-header__nav--desktop" aria-label={copy.navLabel}>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-header__link ${isActivePath(item.href) ? "site-header__link--active" : ""}`.trim()}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Button
          href={getLocalizedPath(locale, "contact")}
          className="site-header__cta"
          track={{ event: "cta_click", payload: { cta: "meeting_request", source: "header" } }}
        >
          {copy.talk}
        </Button>

        <div
          className={`site-header__profile-mini ${
            showProfile ? "site-header__profile-mini--visible" : "site-header__profile-mini--hidden"
          }`}
          aria-hidden={!showProfile}
        >
          <Image src={profileImage} alt="Miguel González" width={40} height={40} />
        </div>
      </Container>
      <div className="site-header__line" aria-hidden="true" />
    </header>
  );
}
