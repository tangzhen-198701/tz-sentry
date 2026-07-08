interface ICore {
    name: string
    age: number
    hobby: string[]
}

const core: ICore = {
    name: 'tz-sentry',
    age: 18,
    hobby: ['play', 'sleep'],
}

export { core, type ICore }
