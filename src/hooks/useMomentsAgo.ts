import { useEffect, useState } from "react";
import { getParsedTimeDiff } from "../utils/time";
import { useQuery } from "@tanstack/react-query";

const useMomentsAgo = (dateNum: number, refreshInterval: number = 1000) => {

    const [timeDiff, setTimediff] = useState<Record<string, number | string>>({
        time: '',
        unit: ''
    })

    useEffect(() => {

        const lastUpdateDate = new Date(dateNum)

        const interval = setInterval(() => {
            const now = new Date()
            const timeDiffParsed = getParsedTimeDiff(lastUpdateDate, now)

            if (timeDiffParsed.timeDiff < 10 || timeDiffParsed.timeDiff % 20 === 0) {
                setTimediff({ ...timeDiffParsed });
            }
        }, refreshInterval);

        return () => clearInterval(interval);
    })

    return {
        timeDiff: timeDiff?.time,
        unit: timeDiff?.unit
    };
}

export default useMomentsAgo;