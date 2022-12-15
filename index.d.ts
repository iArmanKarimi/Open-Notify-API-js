interface ISSLocation {
    message: string
    position: {
        latitude: number
        longitude: number
    }
    date_time: Date
}
interface Astronaut { name: string, craft: string }
interface PeopleInSpace {
    number: number
    message: string
    people: Astronaut[]
}

declare class OpenNotify {
    public static getISSLocation(): Promise<ISSLocation>
    public static getPeopleInSpace(): Promise<PeopleInSpace>
}

export = OpenNotify;
