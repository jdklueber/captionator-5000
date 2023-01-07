function Table({headers, fieldNames, keyFieldName, data}) {
    const headerRow = <tr>{headers.map((e, idx) => <th key={idx}>{e}</th>)}</tr>

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                {headerRow}
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                {data.map((row, rowNum) => (
                                    <tr key={row[keyFieldName]}>
                                        {fieldNames.map((field, idx) =>
                                            <td key={rowNum + field + idx} className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                {field instanceof Function ? field(row): row[field]}
                                            </td>)}
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;