import { createBrowserHistory } from 'history'

const routeHistory = createBrowserHistory()

export const goTo = (path: string): void => routeHistory.push(path)

export default routeHistory
