export function Partners() {
  const partners = [
    "UCLA Health",
    "Johns Hopkins",
    "Mayo Clinic",
    "Cleveland Clinic",
    "Stanford Medicine",
    "Cedars-Sinai",
  ];

  return (
    <section className="py-16 border-t border-border">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <p className="mb-8 text-center text-sm font-semibold uppercase tracking-wider text-muted">
          Our Partners & Affiliates
        </p>
        <div className="grid grid-cols-2 gap-8 items-center sm:grid-cols-3 lg:grid-cols-6">
          {partners.map((partner) => (
            <div
              key={partner}
              className="flex h-16 items-center justify-center rounded-lg bg-gray-50 px-4"
            >
              <span className="text-sm font-semibold text-muted/60 whitespace-nowrap">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
