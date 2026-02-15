import React from "react";

interface BOMItem {
  name: string;
  value: string;
  footprint: string;
  quantity: number;
}

interface BOMDisplayProps {
  bom: BOMItem[] | null | undefined;
  className?: string;
}

export const BOMDisplay: React.FC<BOMDisplayProps> = ({ bom, className }) => {
  if (!bom || bom.length === 0) {
    return (
      <div
        className={`flex items-center justify-center h-full text-white/40 text-sm ${className || ""}`}
      >
        No BOM data available
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col h-full bg-black text-white/70 ${className || ""}`}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-white/10">
        <h2 className="text-sm font-bold text-white/90 uppercase tracking-wide">
          Bill of Materials
        </h2>
        <p className="text-xs text-white/40 mt-1">
          {bom.length} component{bom.length !== 1 ? "s" : ""}
        </p>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-auto">
        <table className="w-full">
          <thead className="sticky top-0 bg-black/95 border-b border-white/10 z-10">
            <tr>
              <th className="text-left px-6 py-3 text-xs font-bold text-white/50 uppercase tracking-wide w-24">
                Qty
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-white/50 uppercase tracking-wide">
                Designator
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-white/50 uppercase tracking-wide">
                Value
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-white/50 uppercase tracking-wide">
                MPN
              </th>
              <th className="text-left px-6 py-3 text-xs font-bold text-white/50 uppercase tracking-wide">
                Footprint
              </th>
            </tr>
          </thead>
          <tbody>
            {bom.map((item: any, index) => (
              <tr
                key={index}
                className="border-b border-white/5 hover:bg-white/5 transition-colors"
              >
                <td className="px-6 py-3 text-sm font-mono text-white/90">
                  {item.quantity}
                </td>
                <td className="px-6 py-3 text-sm font-mono text-white/70">
                  {item.name}
                </td>
                <td className="px-6 py-3 text-sm font-mono text-white/90 font-bold text-blue-300">
                  {item.value}
                </td>
                <td className="px-6 py-3 text-sm font-mono text-white/60">
                  {item.mpn ? (
                    <span className="text-green-400">{item.mpn}</span>
                  ) : (
                    <span className="text-white/20">-</span>
                  )}
                  {item.manufacturer && (
                    <div className="text-[10px] text-white/40">
                      {item.manufacturer}
                    </div>
                  )}
                </td>
                <td className="px-6 py-3 text-sm font-mono text-white/60">
                  {item.footprint}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
