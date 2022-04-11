import {InPersonChecked} from "../interfaces/Interfaces";

export const acquireFamily = (adj: InPersonChecked[], start: InPersonChecked): InPersonChecked[] => {
    // инициализируем семью
    let family = []
    family.push(start)

    // инициализируем очередь
    let queue = []
    queue.push(start)

    start.checked = true

    while (queue.length > 0) {
        let v: InPersonChecked | undefined = queue.shift()
        if (v && v.relatives.length > 0) {
            for (let relativeId of v.relatives) {
                const relative: InPersonChecked | undefined = adj.find(el => el.id === relativeId)
                if (relative && !relative.checked) {
                    queue.push(relative)
                    relative.checked = true
                    family.push(relative)
                }
            }
        }
    }
    return family
}

export const relatives = (people: InPersonChecked[]): InPersonChecked[][] => {
    const families = []
    let checkedId = people.map(el => ({...el, checked: false}))
    while (checkedId.length > 0) {
        const family = acquireFamily(checkedId, checkedId[0])
        families.push([...family])
        checkedId = checkedId.filter(el => !el.checked)
    }
    return families
}