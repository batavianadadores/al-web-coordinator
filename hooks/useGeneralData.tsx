import { useState, useEffect } from "react";
import DataProvider from "@dataprovider/data-provider";

function useGeneralData() {
    const [generalData, setGeneralData] = useState<GeneralData>({
        pools: [],
        idTypes: [],
        sellers: [],
        holidays: [],
        paymentTypes: [],
        courses: [],
        lessonStates: [],
    });

    useEffect(() => {
        async function getGeneralData() {
            const response = await Promise.all([
                DataProvider.listPools(),
                DataProvider.listGeneral(),
                DataProvider.listCourses(),
            ]);

            const pools = response[0];
            const partial = response[1];
            const courses = response[2];
            const lessonStates = DataProvider.listLessonStates();

            setGeneralData({
                pools,
                courses,
                lessonStates,
                ...partial,
            });
        }

        getGeneralData();
    }, []);

    return generalData;
}

export default useGeneralData;
