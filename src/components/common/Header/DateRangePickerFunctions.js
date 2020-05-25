import { defaultStaticRanges, defaultInputRanges } from 'react-date-range/dist/defaultRanges'
import moment from 'moment';
const dateObj = new Date();

export const allStaticRanges = (lang) => {
    const staticRanges = defaultStaticRanges.map((range, id) => {

        if(range.label === 'This Week') range.id = 'thisWeek';
        if(range.label === 'This Month') range.id = 'thisMounth';

        switch (lang) {
            case 'fr':
                switch (range.label) {
                    case 'Today':
                        range.label = "Aujourd'hui";
                        break;
                    case 'Yesterday':
                        range.label = 'Hier';
                        break;
                    case 'This Week':
                        range.label = 'Cette semaine';
                        break;
                    case 'Last Week':
                        range.label = 'La semaine dernière';
                        break;
                    case 'This Month':
                        range.label = 'Ce mois-ci';
                        break;
                    case 'Last Month':
                        range.label = 'Le mois dernier';
                        break;
                    default:
                        break;
                }
            break;
            default:
                break;
        }

        return range;
    })

    // modify default ranges

    staticRanges.forEach(range => {
        if(range.id === 'thisWeek') {
            range.range = () => ({
                startDate: getCurrentSunday(),
                endDate: new Date(),
            })
        }
        if(range.id === 'thisMounth') {
            range.range = () => ({
                startDate: new Date().setDate(1),
                endDate: new Date(),
            })
        }
    })

    const CADRange = {
        label: 'CAD',
        range: () => ({
            startDate: new Date(dateObj.getFullYear(), 0, 1),
            endDate: new Date()
        }),
        isSelected(range) {
            const definedRange = this.range();
            const isSameStartDay = range.startDate.isSame(moment(definedRange.startDate).format('YYYY-MM-DD'), 'day');
            const isSameEndDay = range.endDate.isSame(moment(definedRange.endDate).format('YYYY-MM-DD'), 'day');
            return isSameStartDay && isSameEndDay;
        },
    }

    const CAMRange = {
        label: 'CAM',
        range: () => ({
            startDate: getCAMStartDate(),
            endDate: new Date()
        }),
        isSelected(range) {
            const definedRange = this.range();
            const isSameStartDay = range.startDate.isSame(moment(definedRange.startDate).format('YYYY-MM-DD'), 'day');
            const isSameEndDay = range.endDate.isSame(moment(definedRange.endDate).format('YYYY-MM-DD'), 'day');
            return isSameStartDay && isSameEndDay;
        },
    }

    staticRanges.push(CADRange);
    staticRanges.push(CAMRange);

    return staticRanges;

  }
  
export const allInputRanges = (lang) => {
    return defaultInputRanges.map(range => {
        switch (lang) {
            case 'fr':
                switch (range.label) {
                    case 'days starting today':
                        range.label = "jours à partir d'aujourd'hui";
                        break;
                    case 'days up to today':
                        range.label = "jours jusqu'à aujourd'hui";
                        break;
                    default:
                        break;

                }
            break;
            default:
                break;
        }
        return range;
    })
}

const getCurrentSunday = () => {
    let d = new Date();
    let day = d.getDay();
    let diff = d.getDate() - day;
    return new Date(d.setDate(diff));
}

const getCAMStartDate = () => {
    return new Date(new Date().setFullYear(new Date().getFullYear() - 1));
}