import React from 'react'

export const convertNewLinesToJsxBr = (value: string): React.ReactNode => {
    const lines = value.split('\\n')
    return (
        <React.Fragment>
            {lines.map((line, idx) => (
                <React.Fragment key={idx}>
                    {line}
                    <br />
                </React.Fragment>
            ))}
        </React.Fragment>
    )
}
