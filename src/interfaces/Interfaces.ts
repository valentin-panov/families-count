export interface Status {
    status: 'idle' | 'pending' | 'success' | 'error'
    error: string
}

export interface InPerson {
    id: number,
    relatives: number[]
}

export interface InPersonChecked extends InPerson {
    checked: boolean
}

export interface InPeople extends Status {
    data: InPersonChecked[];
    families: InPersonChecked[][]
}