// Consistent left/right padding for every section container, matching the
// Figma source exactly: max-w-[1280px] px-[80px] (fileKey
// oUfia3Xyvwt2JN8fQawUpA, e.g. node 4:21 "Reliable Taxi & Livery Section").
// Scales down responsively on smaller screens since Figma only defines the
// desktop (1280px) frame.
export const SITE_CONTAINER =
  'mx-auto w-full max-w-[1280px] px-6 sm:px-8 md:px-12 lg:px-[80px]';
