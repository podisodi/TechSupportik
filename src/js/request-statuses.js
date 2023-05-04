export function statusToString(requestStatus) {
    switch(requestStatus) {
        case 0: return 'none';
        case 1: return 'accept';
        case 2: return 'waiting';
        case 3: return 'complete';
        case 4: return 'decline';
    }
}

export function statusToRusString(requestStatus) {
    switch(requestStatus) {
        case 0: return 'Не определен';
        case 1: return 'Начато';
        case 2: return 'Ждет решения';
        case 3: return 'Завершено';
        case 4: return 'Отклонено';
    }
}