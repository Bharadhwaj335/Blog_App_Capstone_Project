// src/styles/common.js
// Theme: Apple Light — white/f5f5f7 background, #1d1d1f text, #0066cc accent
// Inspired by apple.com — no gradients, no shadows, pure typography & spacing

// ─── Layout ───────────────────────────────────────────
export const pageBackground = "min-h-screen bg-[#f4f6f8]";
export const pageWrapper = "max-w-6xl mx-auto px-4 sm:px-8 lg:px-12 py-10 sm:py-14";
export const section = "mb-12 sm:mb-16";

// ─── Cards ────────────────────────────────────────────
export const cardClass =
  "bg-white border border-[#e7ebef] rounded-2xl p-7 hover:-translate-y-0.5 hover:shadow-[0_14px_28px_rgba(15,23,42,0.08)] transition duration-300";

// ─── Typography ───────────────────────────────────────
export const pageTitleClass = "text-4xl sm:text-5xl font-bold text-[#1f2937] tracking-tight leading-[1.05] mb-3";
export const headingClass = "text-2xl sm:text-3xl font-bold text-[#1f2937] tracking-tight";
export const subHeadingClass = "text-lg font-semibold text-[#1f2937] tracking-tight";
export const bodyText = "text-[#4b5563] leading-relaxed";
export const mutedText = "text-sm text-[#6b7280]";
export const linkClass = "text-[#0066cc] hover:text-[#004499] transition-colors";

// ─── Buttons ──────────────────────────────────────────
export const primaryBtn =
  "inline-flex items-center justify-center bg-[#0b66c3] text-white font-semibold px-5 py-2.5 rounded-full hover:bg-[#08529b] transition-colors cursor-pointer text-sm tracking-tight";
export const secondaryBtn =
  "inline-flex items-center justify-center border border-[#ced5de] bg-white text-[#1f2937] font-medium px-5 py-2.5 rounded-full hover:bg-[#f7fafc] transition-colors cursor-pointer text-sm";
export const ghostBtn =
  "inline-flex items-center gap-1 text-[#0b66c3] font-semibold hover:text-[#08529b] transition-colors cursor-pointer text-sm";

// ─── Forms ────────────────────────────────────────────
export const formCard =
  "bg-white/95 border border-[#e3e8ef] rounded-3xl p-8 sm:p-10 max-w-4xl mx-auto shadow-[0_16px_34px_rgba(15,23,42,0.08)]";
export const formTitle = "text-2xl font-bold text-[#1f2937] tracking-tight text-center mb-7";
export const labelClass = "text-xs font-semibold text-[#4b5563] mb-1.5 block";
export const inputClass =
  "w-full bg-white border border-[#d2dae3] rounded-xl px-4 py-2.5 text-[#1f2937] text-sm placeholder:text-[#9ca3af] focus:outline-none focus:border-[#0b66c3] focus:ring-2 focus:ring-[#0b66c3]/10 transition";
export const formGroup = "mb-4";
export const submitBtn =
  "w-full bg-[#0b66c3] text-white font-semibold py-2.5 rounded-full hover:bg-[#08529b] transition-colors cursor-pointer mt-2 text-sm tracking-tight";

// ─── Navbar ───────────────────────────────────────────
export const navbarClass =
  "bg-white/80 backdrop-blur-xl border-b border-[#dce4ec] px-4 sm:px-8 h-16 flex items-center sticky top-0 z-50";
export const navContainerClass = "max-w-6xl mx-auto w-full flex items-center justify-between";
export const navBrandClass = "text-lg font-bold text-[#1f2937] tracking-tight";
export const navLinksClass = "flex items-center gap-2 sm:gap-3";
export const navLinkClass =
  "text-[0.82rem] text-[#4b5563] hover:text-[#1f2937] px-3 py-1.5 rounded-full transition-colors font-medium";
export const navLinkActiveClass = "text-[0.82rem] text-[#0b66c3] bg-[#eaf4ff] px-3 py-1.5 rounded-full font-semibold";

// ─── Article / Blog ───────────────────────────────────
//export const articleGrid        = "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#e8e8ed] border border-[#e8e8ed] rounded-2xl overflow-hidden"
export const articleGrid = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6";
export const articleCardClass =
  "bg-white border border-[#e7ebef] p-7 hover:-translate-y-0.5 hover:shadow-[0_12px_26px_rgba(15,23,42,0.08)] transition duration-300 flex flex-col gap-2.5 min-w-0 overflow-hidden";
export const articleTitle = "text-base font-semibold text-[#1f2937] leading-snug tracking-tight break-words";
export const articleExcerpt = "text-sm text-[#4b5563] leading-relaxed break-words";
export const articleMeta = "text-xs text-[#6b7280]";
export const articleBody = "text-[#374151] leading-[1.85] text-[0.95rem] max-w-2xl";
export const timestampClass = "text-xs text-[#6b7280] flex items-center gap-1.5";
export const tagClass = "text-[0.65rem] font-semibold text-[#0066cc] uppercase tracking-widest w-fit";

// ─── Article Page ─────────────────────────────────────
export const articlePageWrapper = "max-w-3xl mx-auto px-6 py-14";

export const articleHeader = "mb-10 flex flex-col gap-4";

export const articleCategory = "text-[0.7rem] font-semibold uppercase tracking-widest text-[#0066cc]";

export const articleMainTitle = "text-4xl font-bold text-[#1f2937] leading-tight tracking-tight";

export const articleAuthorRow =
  "flex items-center justify-between border-t border-b border-[#e1e7ee] py-4 text-sm text-[#4b5563]";

export const authorInfo = "flex items-center gap-2 font-medium text-[#1f2937]";

export const articleContent = "text-[#1f2937] leading-[1.9] text-[1rem] whitespace-pre-line mt-8 break-words break-all";

export const articleFooter = "border-t border-[#e8e8ed] mt-12 pt-6 text-sm text-[#a1a1a6]";
// ─── Article Actions ─────────────────────────────
export const articleActions = "flex gap-3 mt-6";

export const editBtn = "bg-[#0066cc] text-white text-sm px-4 py-2 rounded-full hover:bg-[#004499] transition";

export const deleteBtn = "bg-[#ff3b30] text-white text-sm px-4 py-2 rounded-full hover:bg-[#d62c23] transition";

// ─── Article Status Badge ─────────────────────────
export const articleStatusActive =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#34c759]/20 text-[#248a3d]";

export const articleStatusDeleted =
  "absolute top-3 right-3 text-[10px] font-semibold px-2 py-1 rounded-full bg-[#ff3b30]/20 text-[#cc2f26]";

// ─── Feedback ─────────────────────────────────────────
export const errorClass =
  "bg-[#ff3b30]/[0.06] text-[#cc2f26] border border-[#ff3b30]/[0.18] rounded-xl px-4 py-3 text-sm";
export const successClass =
  "bg-[#34c759]/[0.07] text-[#248a3d] border border-[#34c759]/20 rounded-xl px-4 py-3 text-sm";
export const loadingClass = "text-[#0b66c3]/70 text-sm animate-pulse text-center py-10";
export const emptyStateClass = "text-center text-[#6b7280] py-16 text-sm";

// ─── Divider ──────────────────────────────────────────
export const divider = "border-t border-[#e1e7ee] my-10";
