export const getSecondsDiff = (startDate: Date, endDate: Date) => {
    const msInSecond = 1000;

    return Math.round(
        Math.abs(endDate.getTime() - startDate.getTime()) / msInSecond
    );
}


export const getParsedTimeDiff = (startDate: Date, endDate: Date) => {

    const secondsDiff = getSecondsDiff(startDate, endDate)

    let unit = 'seconds'
    let timeDiff = secondsDiff

    if (timeDiff < 60) return {
        unit,
        timeDiff
    }
    // Difference in minutes
    timeDiff = Math.floor(secondsDiff / 60)
    unit = 'minute'

    if (timeDiff > 1) unit = unit + "s"
    return {
        unit,
        timeDiff
    }
}


