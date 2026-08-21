// Button styles sourced from Figma (node 4:15/4:16/4:18, hero CTAs):
// rounded-lg, generous padding, 16px regular text — not the old
// small-caps/tight-tracking button style.
const BTN_BASE =
  'inline-flex items-center justify-center rounded-lg text-[16px] leading-6 font-normal px-8 py-4';

export const BTN_TEAL = `${BTN_BASE} bg-turquoise hover:bg-[#1E5152] text-white`;
export const BTN_BROWN = `${BTN_BASE} bg-brown text-white`;
export const BTN_OUTLINE = `${BTN_BASE} text-off-white border-[1.5px] border-off-white px-[31.5px] py-[15.5px]`;
