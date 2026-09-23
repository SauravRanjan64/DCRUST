import React from 'react';
import { cn } from '../../utils/cn';

export const Table = ({
  columns = [],
  data = [],
  keyExtractor = (item, index) => item.id || index,
  renderMobileCard,
  emptyMessage = 'No records found.',
  className
}) => {
  if (!data || data.length === 0) {
    return (
      <div className="py-12 text-center text-sm text-slate-500 bg-white rounded-xl border border-slate-200">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Mobile Card View (if renderMobileCard is provided, otherwise table scrolls horizontally) */}
      {renderMobileCard ? (
        <div className="md:hidden space-y-3">
          {data.map((item, idx) => (
            <div
              key={keyExtractor(item, idx)}
              className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs space-y-2"
            >
              {renderMobileCard(item, idx)}
            </div>
          ))}
        </div>
      ) : null}

      {/* Desktop Table */}
      <div className={cn("overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs", renderMobileCard && "hidden md:block")}>
        <table className={cn("w-full text-left border-collapse text-sm", className)}>
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/75 text-xs font-semibold uppercase tracking-wider text-slate-500">
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  className={cn(
                    "px-4 py-3.5",
                    col.align === 'right' && "text-right",
                    col.align === 'center' && "text-center",
                    col.headerClassName
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {data.map((row, rowIdx) => (
              <tr
                key={keyExtractor(row, rowIdx)}
                className="hover:bg-slate-50/80 transition-colors"
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    className={cn(
                      "px-4 py-3.5 align-middle text-sm",
                      col.align === 'right' && "text-right",
                      col.align === 'center' && "text-center",
                      col.className
                    )}
                  >
                    {col.render ? col.render(row, rowIdx) : row[col.accessor]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
