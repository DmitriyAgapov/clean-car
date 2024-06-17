import React, { useEffect, useState } from 'react'
import { SWRHook } from "swr";
import { Client } from "utils/schema";
import { CancelToken } from "axios";

//@ts-ignore
export function translite(str:any){let sp = '_';let text = str.toLowerCase();let transl = { '\u0430': 'a', '\u0431': 'b', '\u0432': 'v', '\u0433': 'g', '\u0434': 'd', '\u0435': 'e', '\u0451': 'e', '\u0436': 'zh', '\u0437': 'z', '\u0438': 'i', '\u0439': 'j', '\u043a': 'k', '\u043b': 'l', '\u043c': 'm', '\u043d': 'n', '\u043e': 'o', '\u043f': 'p', '\u0440': 'r', '\u0441': 's', '\u0442': 't', '\u0443': 'u', '\u0444': 'f', '\u0445': 'h', '\u0446': 'c', '\u0447': 'ch', '\u0448': 'sh', '\u0449': 'shch', '\u044a': '\'', '\u044b': 'y', '\u044c': '', '\u044d': 'e', '\u044e': 'yu', '\u044f': 'ya', '\u00AB':'_', '\u00BB':'_', /* «» */ ' ': sp, '_': sp, '`': sp, '~': sp, '!': sp, '@': sp, '#': sp, '$': sp, '%': sp, '^': sp, '&': sp, '*': sp, '(': sp, ')': sp, '-': sp, '\=': sp, '+': sp, '[': sp, ']': sp, '\\': sp, '|': sp, '/': sp, '.': sp, ',': sp, '{': sp, '}': sp, '\'': sp, '"': sp, ';': sp, ':': sp, '?': sp, '<': sp, '>': sp, '№': sp }; let result = '';let curent_sim = '';for(let i=0; i < text.length; i++) if(transl[text[i]] != undefined) {      if(curent_sim != transl[text[i]] || curent_sim != sp){        result += transl[text[i]];        curent_sim = transl[text[i]];      }    } else {      result += text[i];      curent_sim = text[i];}result = result.replace(/^_/, '').replace(/_$/, ''); /* trim */return result}
export const Ctx = React.createContext<any>(null)

export function modifyPermissions(group: any, modificationSchema: any, appType: string, except?: any[]) {
    return group.permissions.map((item: any) => {
        if(except && except.length > 0 &&  !except.find((el:any) => el == item.name)) {
            const matchedItem = modificationSchema[appType].find((el: any) => el.name === item.name) ;
            if (matchedItem) {
                return { ...item, ...matchedItem };
            }
            return item;
        } else {
            return void null;
        }
    });
}

export const modificationSchema = {
    admin: [
        {
            "name": "Компании",
            "delete": null
        },
        {
            "name": "Управление пользователями",
            "delete": null
        },
        {
            "name": "Управление автомобилями",
            "delete": null
        },
        {
            "name": "Управление заявками",
            "delete": null
        },
        {
            "name": "Управление прайс-листом",
            "delete": null
        },
        {
            "name": "Финансовый блок",
            "delete": null
        },
        {
            "name": "Расчетный блок",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },

        {
            "name": "Индивидуальный расчет",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        }
    ],
    customer: [
        {
            "name": "Компании",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Управление пользователями",
            "delete": null
        },
        {
            "name": "Управление автомобилями",
            "delete": null
        },
        {
            "name": "Управление заявками",
            "delete": null
        },
        {
            "name": "Управление прайс-листом",
            "create": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Управление справочниками",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Финансовый блок",
            "create": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Расчетный блок",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Индивидуальный расчет",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        }
    ],
    performer: [
        {
            "name": "Компании",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Управление пользователями",
            "delete": null
        },
        {
            "name": "Управление автомобилями",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Управление заявками",
            "create": null,
            "delete": null
        },
        {
            "name": "Управление лимитами",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },

        {
            "name": "Управление прайс-листом",
            "create": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Управление справочниками",
            "create": null,
            "read": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Финансовый блок",
            "create": null,
            "update": null,
            "delete": null
        },
        {
            "name": "Расчетный блок",
            "delete": null
        },
        {
            "name": "Индивидуальный расчет",
            "delete": null
        }
    ]
}
export const createParams = function(params?: any) {
  function createObjectFromSearchParams(searchParams: any) {
    let obj:any = {};
    for (let [key, value] of searchParams.entries()) {
      obj[key] = value;
    }
    return obj;
  }

  const searchParams = new URLSearchParams(window.location.search)
  let paramsObject = createObjectFromSearchParams(searchParams);
  const obj = {
    q: searchParams.get('q') || null,
    ordering: searchParams.get('ordering') || null,
    page: searchParams.get('page') || 1,
    page_size: searchParams.get('page_size') || 10,
    ...paramsObject,
    ...params
  }
  return obj
}
export function logger(useSWRNext: SWRHook) {
  return (key: any, fetcher: (arg0: any) => any, config: any) => {
    // Add logger to the original fetcher.
    const extendedFetcher = (...args: any[]) => {
      console.log('SWR Request:', key)
      // @ts-ignore
      return fetcher(...args)
    }

    // Execute the hook with the new fetcher.
    return useSWRNext(key, extendedFetcher, config)
  }
}
export function addPaginationParams(useSWRNext: SWRHook) {
  return (key: any, fetcher: (arg0: any) => any, config: any) => {
    // Add logger to the original fetcher.
    const extendedFetcher = (...args: any[]) => {
      console.log('SWR Request:', args)
      // @ts-ignore
      return fetcher(...args)
    }

    // Execute the hook with the new fetcher.
    return useSWRNext(key, extendedFetcher, config)
  }
}
const getOnLineStatus = () =>
  typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
    ? navigator.onLine
    : true;

export const useNavigatorOnLine = () => {
    const [status, setStatus] = React.useState(getOnLineStatus());

    const setOnline = () => setStatus(true);
    const setOffline = () => setStatus(false);

    React.useEffect(() => {
        window.addEventListener('online', setOnline);
        window.addEventListener('offline', setOffline);

        return () => {
            window.removeEventListener('online', setOnline);
            window.removeEventListener('offline', setOffline);
        };
    }, []);

    return status;
};
export interface SearchParams { q: string | null | undefined, ordering: string | null | undefined, page: number | null | undefined, page_size: number | null | undefined, cancelToken?: CancelToken, init: () => any}
export const backToUrlLevel = location.pathname.split('/').slice(0, -1).join('/')

export const useOutsideClick = (callback: () => void) => {
  const ref = React.useRef(null)

  React.useEffect(() => {
    const handleClick = (event: { target: any }) => {
      // @ts-ignore
      if (ref.current && !ref.current.contains(event.target)) {
        callback()
      }
    }
    document.addEventListener('click', handleClick, true)

    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [ref])

  return ref
}

export function useIsValid(ar: string[], formContext: any)  {
  const [isNotValid, setIsNotValid] = useState(true);
  useEffect(() => {
    let counter = 0;
    ar.forEach((fieldName) => {
      if(!formContext.isValid(fieldName)) {
        formContext.isDirty(fieldName) && formContext.setFieldError(fieldName, 'Обязательное поле');
        counter ++
      }
    })
    setIsNotValid(counter !== 0)
  }, [formContext.values]);
  return isNotValid;
}

export const dateTransformShort = (date: string) => {
  const value = !date ? new Date(Date.now()) : new Date(date)
  const options = {
    day: 'numeric', weekday: 'long', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric',
  }
  const day = value.getDate().toLocaleString('ru', { compactDisplay: 'short' })
  const month = value.toLocaleString('default', { month: '2-digit' })
  const year = value.toLocaleString('ru', {year: '2-digit'})
  const hours = value.getHours().toLocaleString('ru', { compactDisplay: 'long' })
  const min = value.getMinutes().toLocaleString('ru', { compactDisplay: 'long' })

  return {
    date: `${day}.${month}.${year} ${hours}:${min}`
  }
}
export const dateTransform = (date: string) => {
  const value = !date ? new Date(Date.now()) : new Date(date)
  const options = {
    day: 'numeric', weekday: 'long', year: 'numeric', month: 'long', hour: 'numeric', minute: 'numeric',
  }
  const day = value.getDate().toLocaleString('ru', { compactDisplay: 'long' })
  const month = value.toLocaleString('default', { month: 'long' })
  const year = value.getFullYear()
  const hours = value.getHours().toLocaleString('ru', { compactDisplay: 'long' })
  const min = value.getMinutes().toLocaleString('ru', { compactDisplay: 'long' })

  return {
    date: `${day} ${month} ${year} года ${hours}:${min}`
  }
}

type WindowDimentions = {
  width: number | undefined;
  height: number | undefined;
  state: Promise<boolean> | boolean | undefined;
};


export const isServer = typeof window === 'undefined';
export const resolutionQuality =  (width:number) => {

  const videoSize = [ 240, 360, 480, 720, 1080, 1440, 2160 ];

  if (width) {
    const resQuality = (it: number) => width / 4 * 3 < it

    const qlty = () => {
      if (videoSize.findIndex(resQuality) > 0) return videoSize[videoSize.findIndex(resQuality)];
      if (videoSize.findIndex(resQuality) - 1 < 0) return videoSize[videoSize.length - 1];
    }
    let quality = qlty();
    return [
      { src: `https://nestrecovery.b-cdn.net/nest_promo_${quality}p.webm`, type: 'video/webm' },
      { src: `https://nestrecovery.b-cdn.net/nest_promo_${quality}p.mp4`, type: 'video/mp4' }
    ]
  }
}
export const useWindowDimensions = (): WindowDimentions => {
  const [windowDimensions, setWindowDimensions] = useState<WindowDimentions>({
    width: undefined,
    height: undefined,
    state: undefined
  });
  useEffect(() => {
    function handleResize(): void {
      setWindowDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
        state: window.innerWidth < window.innerHeight
      });
    }
    handleResize();

    window.addEventListener('resize', handleResize);
    return (): void => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount

  return windowDimensions;
};

export function formatPhone(phone:string) {
    let digits = phone.replace("8", '7').replace(/[^\d]+/, '');
    console.log(digits, 'dg');
    if (digits.length < 11) {
        return phone;
    }
    //
    // // Домашний?
    // if (digits.substr(0, 2) === '74') {
    //     // Для белгородских (и похожих) домашних возвращаем нормальное форматирование
    //     // Для остальных пытаемся
    //     return digits.substr(0, 3) === '747' ?
    //       digits.replace(/^(\d)(\d+)(\d\d)(\d\d)(\d\d)$/, '+$1 ($2) $3‒$4‒$5') :
    //       digits.replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1 ($2) $3‒$4‒$5');
    // }
    //
    // // Для русских мобильных возвращаем нормальное форматирование
    // // Для остальных пытаемся
    return digits.substr(0, 2) === '79' ?
      digits.replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1 $2 $3 $4 $5') :
      digits.replace(/^(\d)(\d+)(\d\d\d)(\d\d)(\d\d)$/, '+$1$2 $3‒$4‒$5');
}
