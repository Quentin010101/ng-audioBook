export class State {

    init: boolean = false
    title!: string
    duration: number = 0
    currentTime: number = 0
    playing: boolean = false
    paused: boolean = false
    canPlay: boolean = false
    volume: number = 0.5
}