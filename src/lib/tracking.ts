export type TrackingEventName =
  | "cta_click"
  | "form_submit"
  | "case_open"
  | "resource_open"
  | "form_started"
  | "step_1_completed"
  | "step_2_completed"
  | "step_3_completed"
  | "step_4_completed"
  | "form_submitted"
  | "abandonment_by_step"
  | "linkedin_contact_clicked"
  | "selected_role_type"
  | "selected_goals"
  | "selected_timing"
  | "contact_step_1_completed"
  | "contact_step_2_completed"
  | "contact_step_3_completed"
  | "contact_form_submitted"
  | "contact_form_success"
  | "contact_form_error"
  | "contact_need_type_selected"
  | "contact_role_type_selected";

export function trackEvent(
  event: TrackingEventName,
  payload: Record<string, unknown> = {}
) {
  if (process.env.NODE_ENV !== "production") {
    // Vendor-agnostic stub. Replace by Segment/GA4/etc. when needed.
    // eslint-disable-next-line no-console
    console.log("[tracking]", event, payload);
  }
}
