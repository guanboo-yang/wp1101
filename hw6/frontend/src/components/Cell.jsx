import React, { useState, useEffect } from 'react'

const Cell = ({ detail, pressCell, hint }) => {
	const [faint, setFaint] = useState('')

	useEffect(() => {
		if (detail.hint && hint) setFaint('faint')
		else setFaint('')
	}, [detail, hint])

	return (
		<>
			{
				{
					'-2': <div className={'cell black faint'} onClick={() => pressCell(detail.row, detail.col)}></div>,
					'-1': <div className={'cell black'} onClick={() => pressCell(detail.row, detail.col)}></div>,
					0: <div className={`cell ${faint}`} onClick={() => pressCell(detail.row, detail.col)}></div>,
					1: <div className={'cell white'} onClick={() => pressCell(detail.row, detail.col)}></div>,
					2: <div className={'cell white faint'} onClick={() => pressCell(detail.row, detail.col)}></div>,
				}[detail.color]
			}
		</>
	)
}

export default Cell
