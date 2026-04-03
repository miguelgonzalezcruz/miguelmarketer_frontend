"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import profileImage from "@/src/images/history/miguelmarketer_.png";
import { Container } from "@/src/components/ui/Container";
import { Button } from "@/src/components/ui/Button";

const navItems = [
  { href: "/experiencia-relevante", label: "Experiencia Relevante" },
];

export function SiteHeader() {
  const [showProfile, setShowProfile] = useState(false);
  const pathname = usePathname();

  const isActivePath = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  useEffect(() => {
    if (pathname !== "/") {
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
  }, [pathname]);

  return (
    <header className="site-header">
      <Container className="site-header__inner">
        <Link href="/" className="site-header__brand" aria-label="Volver al inicio">
          <img
            src="/logos/miguelmarketer-white.svg"
            alt=""
            aria-hidden="true"
            className="site-header__brand-logo"
          />
          <span className="site-header__brand-text">
            <span className="site-header__brand-name">Miguel González</span>
            <span className="site-header__brand-separator"> | </span>
            <span className="site-header__brand-role">Marketing Director</span>
          </span>
        </Link>

        <nav className="site-header__nav site-header__nav--desktop" aria-label="Navegación principal">
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
          href="/contacto"
          className="site-header__cta"
          track={{ event: "cta_click", payload: { cta: "meeting_request", source: "header" } }}
        >
          Hablemos
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
      <Container>
        <nav className="site-header__nav site-header__nav--mobile" aria-label="Navegación principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`site-header__mobile-link ${
                isActivePath(item.href) ? "site-header__mobile-link--active" : ""
              }`.trim()}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
      <div className="site-header__line" aria-hidden="true" />
    </header>
  );
}
