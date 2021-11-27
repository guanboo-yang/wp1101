import { useState, useEffect, useRef } from 'react'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Paper from '@material-ui/core/Paper'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TabPanel from './TabPanel'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import styled from 'styled-components'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import ScoreTable from './ScoreTable'

import { useStyles } from '../hooks'
import axios from '../api'
import { useScoreCard } from '../hooks/useScoreCard'

const Wrapper = styled.section`
	display: flex;
	flex-direction: column;
	width: min(700px, 85vw);
	// width: 700px;
	height: 75vh;
`

const TabWrapper = styled.section`
	display: flex;
	flex-direction: row;
	height: 100%;
	width: 100%;
	overflow: auto;
	@media (max-width: 600px) {
		flex-direction: column;
		* {
			width: 100% !important;
			height: auto !important;
		}
	}
`

const Row = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 40px;
`

const StyledFormControl = styled(FormControl)`
	min-width: 120px;
`

const ContentPaper = styled(Paper)`
	height: 100%;
	padding: 1em;
	overflow: auto;
	scroll-behavior: smooth;
	* {
		font-family: 'Fira Code' !important;
		letter-spacing: 0 !important;
	}
`

const a11yProps = index => {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	}
}

const sortData = (sortDirection, table) => {
	var toSort = JSON.parse(JSON.stringify(table))
	var compareFn = (i, j) => {
		if (i.score < j.score) return sortDirection === 'asc' ? -1 : 1
		if (i.score > j.score) return sortDirection === 'asc' ? 1 : -1
		return 0
	}
	return toSort.sort(compareFn)
}

const Body = () => {
	const classes = useStyles()
	const { messages, addCardMessage, addRegularMessage, addErrorMessage } = useScoreCard()
	const [name, setName] = useState('')
	const [subject, setSubject] = useState('')
	const [score, setScore] = useState(0)
	const [queryType, setQueryType] = useState('name') /* 'name' | 'subject' */
	const [queryString, setQueryString] = useState('')
	const [tab, setTab] = useState(0) /* 0 | 1 */
	const [table, setTable] = useState([])
	const [active, setActive] = useState(false)

	const handleChangeTab = (event, newTab) => {
		setTab(newTab)
		setActive(false)
	}

	const content = useRef(null)
	useEffect(() => {
		content.current.scrollTop = content.current.scrollHeight
	}, [messages])

	const handleChange = func => event => {
		func(event.target.value)
	}

	const rgx = new RegExp(/^[A-Z][a-z]*$/)

	const handleAdd = async () => {
		console.log(rgx.test(name))
		if (!rgx.test(name)) {
			addErrorMessage(`Validation failed: name: Path \`name\` (${name}) should be capitalized (ex: John).`)
			console.error('[Error 409]: Validation Failed')
			return
		}
		if (!rgx.test(subject)) {
			addErrorMessage(`Validation failed: subject: Path \`subject\` (${subject}) should be capitalized (ex: Math).`)
			console.error('[Error 409]: Validation Failed')
			return
		}
		const {
			data: { message, card },
		} = await axios.post('/api/create-card', {
			name,
			subject,
			score,
		})
		if (!card) {
			addErrorMessage(message)
			console.error('[Error 409]: Validation Failed')
		} else {
			addCardMessage(message)
			setActive(false)
		}
	}

	const handleQuery = async () => {
		const {
			data: { message, table: retTable, messages },
		} = await axios.get('/api/query-cards', {
			params: {
				type: queryType,
				queryString,
			},
		})
		if (retTable.length === 0) addErrorMessage(message)
		else {
			// addRegularMessage(message)
			addRegularMessage(message, ...messages)
			setTable(retTable)
			setActive(false)
		}
	}

	const requestSort = sortDirection => {
		var sortedItems = sortData(sortDirection, table)
		console.log(sortedItems)
		console.log('object')
		setTable(sortedItems)
	}

	return (
		<Wrapper>
			<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
				<Tabs value={tab} onChange={handleChangeTab} aria-label='tabs' centered indicatorColor='primary' textColor='primary'>
					<Tab label='Add' {...a11yProps(0)} />
					<Tab label='Query' {...a11yProps(1)} />
				</Tabs>
			</Box>
			<TabPanel value={tab} index={0}>
				<Row>
					<TextField //
						className={classes.input}
						placeholder='Name'
						value={name}
						onChange={handleChange(setName)}
					/>
					<TextField //
						className={classes.input}
						placeholder='Subject'
						style={{ width: 240 }}
						value={subject}
						onChange={handleChange(setSubject)}
					/>
					<TextField //
						className={classes.input}
						placeholder='Score'
						value={score}
						onChange={handleChange(setScore)}
						type='number'
					/>
					<Button //
						className={classes.button}
						variant='contained'
						color='primary'
						disabled={!name || !subject}
						onClick={handleAdd}>
						Add
					</Button>
				</Row>
			</TabPanel>
			<TabPanel value={tab} index={1}>
				<Row>
					<StyledFormControl>
						<FormControl component='fieldset'>
							<RadioGroup //
								row
								value={queryType}
								onChange={handleChange(setQueryType)}>
								<FormControlLabel //
									value='name'
									control={<Radio color='primary' />}
									label='Name'
								/>
								<FormControlLabel //
									value='subject'
									control={<Radio color='primary' />}
									label='Subject'
								/>
							</RadioGroup>
						</FormControl>
					</StyledFormControl>
					<TextField //
						placeholder='Query string...'
						value={queryString}
						onChange={handleChange(setQueryString)}
						style={{ flex: 1, minWidth: '120px' }}
					/>
					<Button //
						className={classes.button}
						variant='contained'
						color='primary'
						disabled={!queryString}
						onClick={handleQuery}>
						Query
					</Button>
				</Row>
			</TabPanel>
			<TabWrapper>
				<ContentPaper ref={content} style={{ width: '45%' }}>
					<Typography variant='h6' style={{ textAlign: 'center', paddingBottom: '10px' }}>
						{'-<< CONSOLE >>-'}
					</Typography>
					{messages.map((m, i) => (
						<Typography variant='body2' key={m + i} style={{ color: m.color }}>
							{m.message}
						</Typography>
					))}
				</ContentPaper>
				<ScoreTable table={table} requestSort={requestSort} active={active} setActive={setActive} handleAdd={handleAdd} />
			</TabWrapper>
		</Wrapper>
	)
}

export default Body
