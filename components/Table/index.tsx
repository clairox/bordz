const Table: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <table className="w-full">{children}</table>
}

const TableHeader: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <th className="p-3 border border-black text-left">{children}</th>
}

const TableRow: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <tr className="">{children}</tr>
}

const TableCell: React.FC<React.PropsWithChildren> = ({ children }) => {
    return <td className="p-3 border border-black text-left">{children}</td>
}

export { Table, TableHeader, TableRow, TableCell }
