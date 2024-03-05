import React, { useEffect, useState } from 'react'
export const  tires  = {
  "id": 32,
  "created": "2024-02-06T21:35:53.827503Z",
  "company": 23,
  "expires": null,
  "is_active": true,
  "tire_positions": [
    {
      "id": 5047,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864756Z",
      "updated": "2024-02-06T21:35:53.864760Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4861,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861447Z",
      "updated": "2024-02-06T21:35:53.861458Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4862,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861480Z",
      "updated": "2024-02-06T21:35:53.861485Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4863,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861499Z",
      "updated": "2024-02-06T21:35:53.861503Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4864,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861517Z",
      "updated": "2024-02-06T21:35:53.861521Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4865,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861535Z",
      "updated": "2024-02-06T21:35:53.861539Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4866,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861552Z",
      "updated": "2024-02-06T21:35:53.861556Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4867,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861570Z",
      "updated": "2024-02-06T21:35:53.861574Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4868,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861587Z",
      "updated": "2024-02-06T21:35:53.861591Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4869,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861604Z",
      "updated": "2024-02-06T21:35:53.861608Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4870,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861622Z",
      "updated": "2024-02-06T21:35:53.861626Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4871,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861639Z",
      "updated": "2024-02-06T21:35:53.861643Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4872,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861657Z",
      "updated": "2024-02-06T21:35:53.861661Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4873,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861674Z",
      "updated": "2024-02-06T21:35:53.861678Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4874,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861691Z",
      "updated": "2024-02-06T21:35:53.861695Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4875,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861708Z",
      "updated": "2024-02-06T21:35:53.861712Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4876,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861726Z",
      "updated": "2024-02-06T21:35:53.861730Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4877,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861743Z",
      "updated": "2024-02-06T21:35:53.861748Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4878,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 11,
        "created": "2023-11-22T12:46:17.377000Z",
        "updated": "2023-11-22T12:46:17.377000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861761Z",
      "updated": "2024-02-06T21:35:53.861765Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4879,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861779Z",
      "updated": "2024-02-06T21:35:53.861783Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4880,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861796Z",
      "updated": "2024-02-06T21:35:53.861800Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4881,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861814Z",
      "updated": "2024-02-06T21:35:53.861818Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4882,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861831Z",
      "updated": "2024-02-06T21:35:53.861835Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4883,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861849Z",
      "updated": "2024-02-06T21:35:53.861853Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4884,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861866Z",
      "updated": "2024-02-06T21:35:53.861870Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4885,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861935Z",
      "updated": "2024-02-06T21:35:53.861940Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4886,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861953Z",
      "updated": "2024-02-06T21:35:53.861957Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4887,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861970Z",
      "updated": "2024-02-06T21:35:53.861974Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4888,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.861988Z",
      "updated": "2024-02-06T21:35:53.861992Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4889,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862005Z",
      "updated": "2024-02-06T21:35:53.862009Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4890,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862022Z",
      "updated": "2024-02-06T21:35:53.862026Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4891,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862039Z",
      "updated": "2024-02-06T21:35:53.862042Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4892,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862056Z",
      "updated": "2024-02-06T21:35:53.862060Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4893,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862073Z",
      "updated": "2024-02-06T21:35:53.862077Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4894,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862090Z",
      "updated": "2024-02-06T21:35:53.862094Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4895,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862107Z",
      "updated": "2024-02-06T21:35:53.862111Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4896,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 12,
        "created": "2023-11-22T12:46:17.384000Z",
        "updated": "2023-11-22T12:46:17.384000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862124Z",
      "updated": "2024-02-06T21:35:53.862129Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4897,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862142Z",
      "updated": "2024-02-06T21:35:53.862147Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4898,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862160Z",
      "updated": "2024-02-06T21:35:53.862164Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4899,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862177Z",
      "updated": "2024-02-06T21:35:53.862181Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4900,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862195Z",
      "updated": "2024-02-06T21:35:53.862199Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4901,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862212Z",
      "updated": "2024-02-06T21:35:53.862216Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4902,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862229Z",
      "updated": "2024-02-06T21:35:53.862233Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4903,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862246Z",
      "updated": "2024-02-06T21:35:53.862251Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4904,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862264Z",
      "updated": "2024-02-06T21:35:53.862269Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4905,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862282Z",
      "updated": "2024-02-06T21:35:53.862286Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4906,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862300Z",
      "updated": "2024-02-06T21:35:53.862304Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4907,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862317Z",
      "updated": "2024-02-06T21:35:53.862321Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4908,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862335Z",
      "updated": "2024-02-06T21:35:53.862339Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4909,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862352Z",
      "updated": "2024-02-06T21:35:53.862356Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4910,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862369Z",
      "updated": "2024-02-06T21:35:53.862373Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4911,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862386Z",
      "updated": "2024-02-06T21:35:53.862390Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4912,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862413Z",
      "updated": "2024-02-06T21:35:53.862417Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4913,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862445Z",
      "updated": "2024-02-06T21:35:53.862449Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4914,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 13,
        "created": "2023-11-22T12:46:17.386000Z",
        "updated": "2023-11-22T12:46:17.386000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862462Z",
      "updated": "2024-02-06T21:35:53.862466Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4915,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862480Z",
      "updated": "2024-02-06T21:35:53.862484Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4916,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862497Z",
      "updated": "2024-02-06T21:35:53.862501Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4917,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862514Z",
      "updated": "2024-02-06T21:35:53.862518Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4918,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862531Z",
      "updated": "2024-02-06T21:35:53.862535Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4919,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862548Z",
      "updated": "2024-02-06T21:35:53.862552Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4920,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862565Z",
      "updated": "2024-02-06T21:35:53.862569Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4921,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862582Z",
      "updated": "2024-02-06T21:35:53.862586Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4922,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862600Z",
      "updated": "2024-02-06T21:35:53.862604Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4923,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862617Z",
      "updated": "2024-02-06T21:35:53.862621Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4924,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862634Z",
      "updated": "2024-02-06T21:35:53.862638Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4925,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862651Z",
      "updated": "2024-02-06T21:35:53.862655Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4926,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862668Z",
      "updated": "2024-02-06T21:35:53.862672Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4927,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862685Z",
      "updated": "2024-02-06T21:35:53.862689Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4928,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862702Z",
      "updated": "2024-02-06T21:35:53.862706Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4929,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862719Z",
      "updated": "2024-02-06T21:35:53.862724Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4930,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862736Z",
      "updated": "2024-02-06T21:35:53.862741Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4931,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862754Z",
      "updated": "2024-02-06T21:35:53.862758Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4932,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 14,
        "created": "2023-11-22T12:46:17.387000Z",
        "updated": "2023-11-22T12:46:17.387000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862771Z",
      "updated": "2024-02-06T21:35:53.862775Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4933,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862788Z",
      "updated": "2024-02-06T21:35:53.862792Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4934,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862805Z",
      "updated": "2024-02-06T21:35:53.862809Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4935,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862822Z",
      "updated": "2024-02-06T21:35:53.862826Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4936,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862839Z",
      "updated": "2024-02-06T21:35:53.862843Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4937,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862856Z",
      "updated": "2024-02-06T21:35:53.862860Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4938,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862874Z",
      "updated": "2024-02-06T21:35:53.862878Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4939,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862891Z",
      "updated": "2024-02-06T21:35:53.862895Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4940,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862908Z",
      "updated": "2024-02-06T21:35:53.862912Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4941,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862925Z",
      "updated": "2024-02-06T21:35:53.862929Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4942,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862943Z",
      "updated": "2024-02-06T21:35:53.862947Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4943,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862960Z",
      "updated": "2024-02-06T21:35:53.862964Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4944,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862977Z",
      "updated": "2024-02-06T21:35:53.862981Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4945,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.862994Z",
      "updated": "2024-02-06T21:35:53.862998Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4946,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863012Z",
      "updated": "2024-02-06T21:35:53.863016Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4947,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863029Z",
      "updated": "2024-02-06T21:35:53.863033Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4948,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863046Z",
      "updated": "2024-02-06T21:35:53.863050Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4949,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863063Z",
      "updated": "2024-02-06T21:35:53.863067Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4950,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 15,
        "created": "2023-11-22T12:46:17.388000Z",
        "updated": "2023-11-22T12:46:17.388000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863080Z",
      "updated": "2024-02-06T21:35:53.863084Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4951,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863097Z",
      "updated": "2024-02-06T21:35:53.863102Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4952,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863115Z",
      "updated": "2024-02-06T21:35:53.863119Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4953,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863132Z",
      "updated": "2024-02-06T21:35:53.863136Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4954,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863149Z",
      "updated": "2024-02-06T21:35:53.863153Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4955,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863166Z",
      "updated": "2024-02-06T21:35:53.863170Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4956,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863183Z",
      "updated": "2024-02-06T21:35:53.863187Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4957,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863200Z",
      "updated": "2024-02-06T21:35:53.863204Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4958,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863217Z",
      "updated": "2024-02-06T21:35:53.863221Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4959,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863235Z",
      "updated": "2024-02-06T21:35:53.863239Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4960,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863252Z",
      "updated": "2024-02-06T21:35:53.863256Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4961,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863269Z",
      "updated": "2024-02-06T21:35:53.863273Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4962,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863286Z",
      "updated": "2024-02-06T21:35:53.863290Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4963,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863303Z",
      "updated": "2024-02-06T21:35:53.863307Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4964,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863320Z",
      "updated": "2024-02-06T21:35:53.863324Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4965,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863337Z",
      "updated": "2024-02-06T21:35:53.863341Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4966,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863355Z",
      "updated": "2024-02-06T21:35:53.863359Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4967,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863372Z",
      "updated": "2024-02-06T21:35:53.863376Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4968,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 16,
        "created": "2023-11-22T12:46:17.390000Z",
        "updated": "2023-11-22T12:46:17.390000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863389Z",
      "updated": "2024-02-06T21:35:53.863393Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4969,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863406Z",
      "updated": "2024-02-06T21:35:53.863410Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4970,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863423Z",
      "updated": "2024-02-06T21:35:53.863427Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4971,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863441Z",
      "updated": "2024-02-06T21:35:53.863445Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4972,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863458Z",
      "updated": "2024-02-06T21:35:53.863462Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4973,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863476Z",
      "updated": "2024-02-06T21:35:53.863480Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4974,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863493Z",
      "updated": "2024-02-06T21:35:53.863497Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4975,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863511Z",
      "updated": "2024-02-06T21:35:53.863515Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4976,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863528Z",
      "updated": "2024-02-06T21:35:53.863532Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4977,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863545Z",
      "updated": "2024-02-06T21:35:53.863549Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4978,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863562Z",
      "updated": "2024-02-06T21:35:53.863566Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4979,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863579Z",
      "updated": "2024-02-06T21:35:53.863583Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4980,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863596Z",
      "updated": "2024-02-06T21:35:53.863600Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4981,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863613Z",
      "updated": "2024-02-06T21:35:53.863617Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4982,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863630Z",
      "updated": "2024-02-06T21:35:53.863634Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4983,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863648Z",
      "updated": "2024-02-06T21:35:53.863652Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4984,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863665Z",
      "updated": "2024-02-06T21:35:53.863669Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4985,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863683Z",
      "updated": "2024-02-06T21:35:53.863687Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4986,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 17,
        "created": "2023-11-22T12:46:17.391000Z",
        "updated": "2023-11-22T12:46:17.391000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863700Z",
      "updated": "2024-02-06T21:35:53.863704Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4987,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863717Z",
      "updated": "2024-02-06T21:35:53.863721Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4988,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863734Z",
      "updated": "2024-02-06T21:35:53.863738Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 4989,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863751Z",
      "updated": "2024-02-06T21:35:53.863755Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4990,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863769Z",
      "updated": "2024-02-06T21:35:53.863773Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4991,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863786Z",
      "updated": "2024-02-06T21:35:53.863790Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4992,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863804Z",
      "updated": "2024-02-06T21:35:53.863808Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4993,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863822Z",
      "updated": "2024-02-06T21:35:53.863826Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4994,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863839Z",
      "updated": "2024-02-06T21:35:53.863843Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4995,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863856Z",
      "updated": "2024-02-06T21:35:53.863860Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4996,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863873Z",
      "updated": "2024-02-06T21:35:53.863877Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 4997,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863890Z",
      "updated": "2024-02-06T21:35:53.863894Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4998,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863907Z",
      "updated": "2024-02-06T21:35:53.863911Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 4999,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863924Z",
      "updated": "2024-02-06T21:35:53.863928Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5000,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863941Z",
      "updated": "2024-02-06T21:35:53.863945Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5001,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863958Z",
      "updated": "2024-02-06T21:35:53.863962Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5002,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863975Z",
      "updated": "2024-02-06T21:35:53.863980Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5003,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.863993Z",
      "updated": "2024-02-06T21:35:53.863997Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5004,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 18,
        "created": "2023-11-22T12:46:17.392000Z",
        "updated": "2023-11-22T12:46:17.392000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864010Z",
      "updated": "2024-02-06T21:35:53.864014Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5005,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864027Z",
      "updated": "2024-02-06T21:35:53.864031Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5006,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864044Z",
      "updated": "2024-02-06T21:35:53.864048Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5007,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864061Z",
      "updated": "2024-02-06T21:35:53.864065Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5008,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864078Z",
      "updated": "2024-02-06T21:35:53.864082Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5009,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864095Z",
      "updated": "2024-02-06T21:35:53.864099Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5010,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864113Z",
      "updated": "2024-02-06T21:35:53.864117Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5011,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864131Z",
      "updated": "2024-02-06T21:35:53.864135Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5012,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864148Z",
      "updated": "2024-02-06T21:35:53.864160Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5013,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864173Z",
      "updated": "2024-02-06T21:35:53.864177Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5014,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864190Z",
      "updated": "2024-02-06T21:35:53.864195Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5015,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864208Z",
      "updated": "2024-02-06T21:35:53.864212Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5016,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864225Z",
      "updated": "2024-02-06T21:35:53.864229Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5017,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864241Z",
      "updated": "2024-02-06T21:35:53.864245Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5018,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864258Z",
      "updated": "2024-02-06T21:35:53.864262Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5019,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864275Z",
      "updated": "2024-02-06T21:35:53.864279Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5020,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864292Z",
      "updated": "2024-02-06T21:35:53.864296Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5021,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864309Z",
      "updated": "2024-02-06T21:35:53.864313Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5022,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 19,
        "created": "2023-11-22T12:46:17.394000Z",
        "updated": "2023-11-22T12:46:17.394000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864326Z",
      "updated": "2024-02-06T21:35:53.864330Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5023,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864343Z",
      "updated": "2024-02-06T21:35:53.864347Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5024,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864361Z",
      "updated": "2024-02-06T21:35:53.864365Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5025,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864378Z",
      "updated": "2024-02-06T21:35:53.864382Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5026,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864395Z",
      "updated": "2024-02-06T21:35:53.864399Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5027,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864412Z",
      "updated": "2024-02-06T21:35:53.864416Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5028,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864429Z",
      "updated": "2024-02-06T21:35:53.864433Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5029,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864446Z",
      "updated": "2024-02-06T21:35:53.864450Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5030,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864463Z",
      "updated": "2024-02-06T21:35:53.864467Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5031,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864480Z",
      "updated": "2024-02-06T21:35:53.864484Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5032,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864497Z",
      "updated": "2024-02-06T21:35:53.864501Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5033,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864514Z",
      "updated": "2024-02-06T21:35:53.864518Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5034,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864532Z",
      "updated": "2024-02-06T21:35:53.864536Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5035,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864549Z",
      "updated": "2024-02-06T21:35:53.864553Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5036,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864566Z",
      "updated": "2024-02-06T21:35:53.864570Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5037,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864583Z",
      "updated": "2024-02-06T21:35:53.864587Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5038,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864600Z",
      "updated": "2024-02-06T21:35:53.864604Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5039,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864617Z",
      "updated": "2024-02-06T21:35:53.864621Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5040,
      "service_subtype": {
        "id": 8,
        "created": "2023-11-22T12:43:31.507000Z",
        "updated": "2023-11-22T12:46:17.365000Z",
        "name": "Стационарный",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 20,
        "created": "2023-11-22T12:46:17.395000Z",
        "updated": "2023-11-22T12:46:17.395000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 8
      },
      "created": "2024-02-06T21:35:53.864634Z",
      "updated": "2024-02-06T21:35:53.864639Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5041,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864652Z",
      "updated": "2024-02-06T21:35:53.864657Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5042,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864670Z",
      "updated": "2024-02-06T21:35:53.864674Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5043,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864687Z",
      "updated": "2024-02-06T21:35:53.864691Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5044,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864704Z",
      "updated": "2024-02-06T21:35:53.864708Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5045,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864721Z",
      "updated": "2024-02-06T21:35:53.864726Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5046,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864739Z",
      "updated": "2024-02-06T21:35:53.864743Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5048,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864773Z",
      "updated": "2024-02-06T21:35:53.864777Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5049,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864790Z",
      "updated": "2024-02-06T21:35:53.864793Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5050,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864806Z",
      "updated": "2024-02-06T21:35:53.864810Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5051,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864823Z",
      "updated": "2024-02-06T21:35:53.864827Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5052,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864840Z",
      "updated": "2024-02-06T21:35:53.864845Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5053,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864858Z",
      "updated": "2024-02-06T21:35:53.864862Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5054,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864877Z",
      "updated": "2024-02-06T21:35:53.864881Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5055,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864895Z",
      "updated": "2024-02-06T21:35:53.864899Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5056,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864915Z",
      "updated": "2024-02-06T21:35:53.864920Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5057,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864945Z",
      "updated": "2024-02-06T21:35:53.864950Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5058,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 21,
        "created": "2023-11-22T12:49:40.820000Z",
        "updated": "2023-11-22T12:49:40.820000Z",
        "name": "Снятие\\установка",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864963Z",
      "updated": "2024-02-06T21:35:53.864967Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5059,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864980Z",
      "updated": "2024-02-06T21:35:53.864984Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5060,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.864997Z",
      "updated": "2024-02-06T21:35:53.865002Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5061,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865015Z",
      "updated": "2024-02-06T21:35:53.865019Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5062,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865032Z",
      "updated": "2024-02-06T21:35:53.865036Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5063,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865050Z",
      "updated": "2024-02-06T21:35:53.865054Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5064,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865067Z",
      "updated": "2024-02-06T21:35:53.865071Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5065,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865084Z",
      "updated": "2024-02-06T21:35:53.865088Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5066,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865101Z",
      "updated": "2024-02-06T21:35:53.865105Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5067,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865118Z",
      "updated": "2024-02-06T21:35:53.865122Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5068,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865135Z",
      "updated": "2024-02-06T21:35:53.865139Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5069,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865152Z",
      "updated": "2024-02-06T21:35:53.865156Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5070,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865170Z",
      "updated": "2024-02-06T21:35:53.865174Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5071,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865187Z",
      "updated": "2024-02-06T21:35:53.865191Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5072,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865204Z",
      "updated": "2024-02-06T21:35:53.865208Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5073,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865227Z",
      "updated": "2024-02-06T21:35:53.865231Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5074,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865244Z",
      "updated": "2024-02-06T21:35:53.865249Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5075,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865262Z",
      "updated": "2024-02-06T21:35:53.865266Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5076,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 22,
        "created": "2023-11-22T12:49:40.827000Z",
        "updated": "2023-11-22T12:49:40.827000Z",
        "name": "Балансировка колес",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865279Z",
      "updated": "2024-02-06T21:35:53.865283Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5077,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865296Z",
      "updated": "2024-02-06T21:35:53.865300Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5078,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865314Z",
      "updated": "2024-02-06T21:35:53.865318Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5079,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865331Z",
      "updated": "2024-02-06T21:35:53.865335Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5080,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865348Z",
      "updated": "2024-02-06T21:35:53.865352Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5081,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865365Z",
      "updated": "2024-02-06T21:35:53.865369Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5082,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865383Z",
      "updated": "2024-02-06T21:35:53.865387Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5083,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865400Z",
      "updated": "2024-02-06T21:35:53.865404Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5084,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865417Z",
      "updated": "2024-02-06T21:35:53.865421Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5085,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865434Z",
      "updated": "2024-02-06T21:35:53.865438Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5086,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865452Z",
      "updated": "2024-02-06T21:35:53.865456Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5087,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865469Z",
      "updated": "2024-02-06T21:35:53.865473Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5088,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865486Z",
      "updated": "2024-02-06T21:35:53.865490Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5089,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865504Z",
      "updated": "2024-02-06T21:35:53.865508Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5090,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865521Z",
      "updated": "2024-02-06T21:35:53.865525Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5091,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865538Z",
      "updated": "2024-02-06T21:35:53.865542Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5092,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865556Z",
      "updated": "2024-02-06T21:35:53.865560Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5093,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865573Z",
      "updated": "2024-02-06T21:35:53.865577Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5094,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 23,
        "created": "2023-11-22T12:49:40.828000Z",
        "updated": "2023-11-22T12:49:40.828000Z",
        "name": "Демонтаж\\монтаж",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865590Z",
      "updated": "2024-02-06T21:35:53.865594Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5095,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865608Z",
      "updated": "2024-02-06T21:35:53.865612Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5096,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865625Z",
      "updated": "2024-02-06T21:35:53.865629Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5097,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865642Z",
      "updated": "2024-02-06T21:35:53.865647Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5098,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865660Z",
      "updated": "2024-02-06T21:35:53.865664Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5099,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865677Z",
      "updated": "2024-02-06T21:35:53.865681Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5100,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865694Z",
      "updated": "2024-02-06T21:35:53.865698Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5101,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865711Z",
      "updated": "2024-02-06T21:35:53.865715Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5102,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865728Z",
      "updated": "2024-02-06T21:35:53.865732Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5103,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865745Z",
      "updated": "2024-02-06T21:35:53.865750Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5104,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865763Z",
      "updated": "2024-02-06T21:35:53.865767Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5105,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865780Z",
      "updated": "2024-02-06T21:35:53.865784Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5106,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865797Z",
      "updated": "2024-02-06T21:35:53.865801Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5107,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865815Z",
      "updated": "2024-02-06T21:35:53.865819Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5108,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865832Z",
      "updated": "2024-02-06T21:35:53.865836Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5109,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865849Z",
      "updated": "2024-02-06T21:35:53.865853Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5110,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865867Z",
      "updated": "2024-02-06T21:35:53.865871Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5111,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865884Z",
      "updated": "2024-02-06T21:35:53.865888Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5112,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 24,
        "created": "2023-11-22T12:49:40.829000Z",
        "updated": "2023-11-22T12:49:40.829000Z",
        "name": "Сезонный шиномонтаж (1 колесо)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865901Z",
      "updated": "2024-02-06T21:35:53.865905Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5113,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865918Z",
      "updated": "2024-02-06T21:35:53.865922Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5114,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865935Z",
      "updated": "2024-02-06T21:35:53.865939Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5115,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865953Z",
      "updated": "2024-02-06T21:35:53.865957Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5116,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865970Z",
      "updated": "2024-02-06T21:35:53.865974Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5117,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.865987Z",
      "updated": "2024-02-06T21:35:53.865991Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5118,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866004Z",
      "updated": "2024-02-06T21:35:53.866008Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5119,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866022Z",
      "updated": "2024-02-06T21:35:53.866026Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5120,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866039Z",
      "updated": "2024-02-06T21:35:53.866043Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5121,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866056Z",
      "updated": "2024-02-06T21:35:53.866060Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5122,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866073Z",
      "updated": "2024-02-06T21:35:53.866077Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5123,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866090Z",
      "updated": "2024-02-06T21:35:53.866094Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5124,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866107Z",
      "updated": "2024-02-06T21:35:53.866111Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5125,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866125Z",
      "updated": "2024-02-06T21:35:53.866129Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5126,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866142Z",
      "updated": "2024-02-06T21:35:53.866146Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5127,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866159Z",
      "updated": "2024-02-06T21:35:53.866163Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5128,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866177Z",
      "updated": "2024-02-06T21:35:53.866181Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5129,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866194Z",
      "updated": "2024-02-06T21:35:53.866198Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5130,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 25,
        "created": "2023-11-22T12:49:40.830000Z",
        "updated": "2023-11-22T12:49:40.830000Z",
        "name": "Сезонный шиномонтаж (4 колеса)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866212Z",
      "updated": "2024-02-06T21:35:53.866216Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5131,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866230Z",
      "updated": "2024-02-06T21:35:53.866234Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5132,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866247Z",
      "updated": "2024-02-06T21:35:53.866252Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5133,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866265Z",
      "updated": "2024-02-06T21:35:53.866269Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5134,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866282Z",
      "updated": "2024-02-06T21:35:53.866287Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5135,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866300Z",
      "updated": "2024-02-06T21:35:53.866304Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5136,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866317Z",
      "updated": "2024-02-06T21:35:53.866321Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5137,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866334Z",
      "updated": "2024-02-06T21:35:53.866338Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5138,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866352Z",
      "updated": "2024-02-06T21:35:53.866356Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5139,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866369Z",
      "updated": "2024-02-06T21:35:53.866373Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5140,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866386Z",
      "updated": "2024-02-06T21:35:53.866390Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5141,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866403Z",
      "updated": "2024-02-06T21:35:53.866408Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5142,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866421Z",
      "updated": "2024-02-06T21:35:53.866425Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5143,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866452Z",
      "updated": "2024-02-06T21:35:53.866456Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5144,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866469Z",
      "updated": "2024-02-06T21:35:53.866473Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5145,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866486Z",
      "updated": "2024-02-06T21:35:53.866490Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5146,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866503Z",
      "updated": "2024-02-06T21:35:53.866507Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5147,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866520Z",
      "updated": "2024-02-06T21:35:53.866524Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5148,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 26,
        "created": "2023-11-22T12:49:40.831000Z",
        "updated": "2023-11-22T12:49:40.831000Z",
        "name": "Сезонный шиномонтаж (6 колес)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866537Z",
      "updated": "2024-02-06T21:35:53.866541Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5149,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866555Z",
      "updated": "2024-02-06T21:35:53.866559Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5150,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866572Z",
      "updated": "2024-02-06T21:35:53.866576Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5151,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866589Z",
      "updated": "2024-02-06T21:35:53.866593Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5152,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866606Z",
      "updated": "2024-02-06T21:35:53.866610Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5153,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866624Z",
      "updated": "2024-02-06T21:35:53.866628Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5154,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866641Z",
      "updated": "2024-02-06T21:35:53.866645Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5155,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866657Z",
      "updated": "2024-02-06T21:35:53.866661Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5156,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866674Z",
      "updated": "2024-02-06T21:35:53.866678Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5157,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866691Z",
      "updated": "2024-02-06T21:35:53.866695Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5158,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866708Z",
      "updated": "2024-02-06T21:35:53.866712Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5159,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866726Z",
      "updated": "2024-02-06T21:35:53.866730Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5160,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866743Z",
      "updated": "2024-02-06T21:35:53.866747Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5161,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866760Z",
      "updated": "2024-02-06T21:35:53.866764Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5162,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866777Z",
      "updated": "2024-02-06T21:35:53.866781Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5163,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866794Z",
      "updated": "2024-02-06T21:35:53.866798Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5164,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866811Z",
      "updated": "2024-02-06T21:35:53.866815Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5165,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866828Z",
      "updated": "2024-02-06T21:35:53.866832Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5166,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 27,
        "created": "2023-11-22T12:49:40.832000Z",
        "updated": "2023-11-22T12:49:40.832000Z",
        "name": "Пакет",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866845Z",
      "updated": "2024-02-06T21:35:53.866849Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5167,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866862Z",
      "updated": "2024-02-06T21:35:53.866866Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5168,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866879Z",
      "updated": "2024-02-06T21:35:53.866883Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5169,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866896Z",
      "updated": "2024-02-06T21:35:53.866900Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5170,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866913Z",
      "updated": "2024-02-06T21:35:53.866917Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5171,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866930Z",
      "updated": "2024-02-06T21:35:53.866934Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5172,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866947Z",
      "updated": "2024-02-06T21:35:53.866951Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5173,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866964Z",
      "updated": "2024-02-06T21:35:53.866968Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5174,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866981Z",
      "updated": "2024-02-06T21:35:53.866985Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5175,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.866999Z",
      "updated": "2024-02-06T21:35:53.867003Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5176,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867016Z",
      "updated": "2024-02-06T21:35:53.867020Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5177,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867033Z",
      "updated": "2024-02-06T21:35:53.867037Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5178,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867051Z",
      "updated": "2024-02-06T21:35:53.867055Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5179,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867068Z",
      "updated": "2024-02-06T21:35:53.867072Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5180,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867086Z",
      "updated": "2024-02-06T21:35:53.867090Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5181,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867103Z",
      "updated": "2024-02-06T21:35:53.867107Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5182,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867120Z",
      "updated": "2024-02-06T21:35:53.867124Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5183,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867137Z",
      "updated": "2024-02-06T21:35:53.867141Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5184,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 28,
        "created": "2023-11-22T12:49:40.834000Z",
        "updated": "2023-11-22T12:49:40.834000Z",
        "name": "Герметизация бортов",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867154Z",
      "updated": "2024-02-06T21:35:53.867158Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5185,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867171Z",
      "updated": "2024-02-06T21:35:53.867175Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5186,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867188Z",
      "updated": "2024-02-06T21:35:53.867192Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5187,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867205Z",
      "updated": "2024-02-06T21:35:53.867209Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5188,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867222Z",
      "updated": "2024-02-06T21:35:53.867226Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5189,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867239Z",
      "updated": "2024-02-06T21:35:53.867243Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5190,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867256Z",
      "updated": "2024-02-06T21:35:53.867260Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5191,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867273Z",
      "updated": "2024-02-06T21:35:53.867277Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5192,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867290Z",
      "updated": "2024-02-06T21:35:53.867294Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5193,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867307Z",
      "updated": "2024-02-06T21:35:53.867311Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5194,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867324Z",
      "updated": "2024-02-06T21:35:53.867328Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5195,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867342Z",
      "updated": "2024-02-06T21:35:53.867346Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5196,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867359Z",
      "updated": "2024-02-06T21:35:53.867363Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5197,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867376Z",
      "updated": "2024-02-06T21:35:53.867380Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5198,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867393Z",
      "updated": "2024-02-06T21:35:53.867397Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5199,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867410Z",
      "updated": "2024-02-06T21:35:53.867414Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5200,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867427Z",
      "updated": "2024-02-06T21:35:53.867431Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5201,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867444Z",
      "updated": "2024-02-06T21:35:53.867448Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5202,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 29,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Чистка/мойка колеса в сборе",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867461Z",
      "updated": "2024-02-06T21:35:53.867465Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5203,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867478Z",
      "updated": "2024-02-06T21:35:53.867482Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5204,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867495Z",
      "updated": "2024-02-06T21:35:53.867499Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5205,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867512Z",
      "updated": "2024-02-06T21:35:53.867516Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5206,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867529Z",
      "updated": "2024-02-06T21:35:53.867533Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5207,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867546Z",
      "updated": "2024-02-06T21:35:53.867550Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5208,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867563Z",
      "updated": "2024-02-06T21:35:53.867567Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5209,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867580Z",
      "updated": "2024-02-06T21:35:53.867584Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5210,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867597Z",
      "updated": "2024-02-06T21:35:53.867601Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5211,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867614Z",
      "updated": "2024-02-06T21:35:53.867618Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5212,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867631Z",
      "updated": "2024-02-06T21:35:53.867635Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5213,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867648Z",
      "updated": "2024-02-06T21:35:53.867652Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5214,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867666Z",
      "updated": "2024-02-06T21:35:53.867670Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5215,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867683Z",
      "updated": "2024-02-06T21:35:53.867687Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5216,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867700Z",
      "updated": "2024-02-06T21:35:53.867704Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5217,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867717Z",
      "updated": "2024-02-06T21:35:53.867721Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5218,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867734Z",
      "updated": "2024-02-06T21:35:53.867738Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5219,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867751Z",
      "updated": "2024-02-06T21:35:53.867755Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5220,
      "service_subtype": {
        "id": 9,
        "created": "2023-11-22T12:43:31.510000Z",
        "updated": "2023-11-22T12:49:40.809000Z",
        "name": "Выездной",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 30,
        "created": "2023-11-22T12:49:40.835000Z",
        "updated": "2023-11-22T12:49:40.835000Z",
        "name": "Замена вентиля",
        "is_common": false,
        "is_active": true,
        "service_subtype": 9
      },
      "created": "2024-02-06T21:35:53.867768Z",
      "updated": "2024-02-06T21:35:53.867772Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5221,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867786Z",
      "updated": "2024-02-06T21:35:53.867790Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5222,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867803Z",
      "updated": "2024-02-06T21:35:53.867807Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5223,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867820Z",
      "updated": "2024-02-06T21:35:53.867824Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5224,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867837Z",
      "updated": "2024-02-06T21:35:53.867841Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5225,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867855Z",
      "updated": "2024-02-06T21:35:53.867859Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5226,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867872Z",
      "updated": "2024-02-06T21:35:53.867876Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5227,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867889Z",
      "updated": "2024-02-06T21:35:53.867893Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5228,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867907Z",
      "updated": "2024-02-06T21:35:53.867911Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5229,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867924Z",
      "updated": "2024-02-06T21:35:53.867928Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5230,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867942Z",
      "updated": "2024-02-06T21:35:53.867946Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5231,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867959Z",
      "updated": "2024-02-06T21:35:53.867963Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5232,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867976Z",
      "updated": "2024-02-06T21:35:53.867980Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5233,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.867993Z",
      "updated": "2024-02-06T21:35:53.867997Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5234,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868010Z",
      "updated": "2024-02-06T21:35:53.868014Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5235,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868027Z",
      "updated": "2024-02-06T21:35:53.868031Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5236,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868044Z",
      "updated": "2024-02-06T21:35:53.868048Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5237,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868061Z",
      "updated": "2024-02-06T21:35:53.868066Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5238,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 31,
        "created": "2023-11-22T12:53:21.123000Z",
        "updated": "2023-11-22T12:53:21.123000Z",
        "name": "Устранение прокола (жгут)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868079Z",
      "updated": "2024-02-06T21:35:53.868083Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5239,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868096Z",
      "updated": "2024-02-06T21:35:53.868100Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5240,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868114Z",
      "updated": "2024-02-06T21:35:53.868118Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5241,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868131Z",
      "updated": "2024-02-06T21:35:53.868135Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5242,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868148Z",
      "updated": "2024-02-06T21:35:53.868152Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5243,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868166Z",
      "updated": "2024-02-06T21:35:53.868170Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5244,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868183Z",
      "updated": "2024-02-06T21:35:53.868187Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5245,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868200Z",
      "updated": "2024-02-06T21:35:53.868204Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5246,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868217Z",
      "updated": "2024-02-06T21:35:53.868221Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5247,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868235Z",
      "updated": "2024-02-06T21:35:53.868239Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5248,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868252Z",
      "updated": "2024-02-06T21:35:53.868256Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5249,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868269Z",
      "updated": "2024-02-06T21:35:53.868273Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5250,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868286Z",
      "updated": "2024-02-06T21:35:53.868290Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5251,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868303Z",
      "updated": "2024-02-06T21:35:53.868307Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5252,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868320Z",
      "updated": "2024-02-06T21:35:53.868324Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5253,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868337Z",
      "updated": "2024-02-06T21:35:53.868342Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5254,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868355Z",
      "updated": "2024-02-06T21:35:53.868359Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5255,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868372Z",
      "updated": "2024-02-06T21:35:53.868376Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5256,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 32,
        "created": "2023-11-22T12:54:09.471000Z",
        "updated": "2023-11-22T12:54:09.471000Z",
        "name": "Устранение прокола (грибок)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868389Z",
      "updated": "2024-02-06T21:35:53.868393Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5257,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868406Z",
      "updated": "2024-02-06T21:35:53.868410Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5258,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868423Z",
      "updated": "2024-02-06T21:35:53.868427Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5259,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868441Z",
      "updated": "2024-02-06T21:35:53.868445Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5260,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868458Z",
      "updated": "2024-02-06T21:35:53.868462Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5261,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868475Z",
      "updated": "2024-02-06T21:35:53.868479Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5262,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868492Z",
      "updated": "2024-02-06T21:35:53.868496Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5263,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868509Z",
      "updated": "2024-02-06T21:35:53.868513Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5264,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868527Z",
      "updated": "2024-02-06T21:35:53.868531Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5265,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868544Z",
      "updated": "2024-02-06T21:35:53.868548Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5266,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868561Z",
      "updated": "2024-02-06T21:35:53.868565Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5267,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868579Z",
      "updated": "2024-02-06T21:35:53.868583Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5268,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868596Z",
      "updated": "2024-02-06T21:35:53.868600Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5269,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868613Z",
      "updated": "2024-02-06T21:35:53.868617Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5270,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868630Z",
      "updated": "2024-02-06T21:35:53.868634Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5271,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868647Z",
      "updated": "2024-02-06T21:35:53.868651Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5272,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868664Z",
      "updated": "2024-02-06T21:35:53.868668Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5273,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868681Z",
      "updated": "2024-02-06T21:35:53.868685Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5274,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 33,
        "created": "2023-11-22T12:54:09.477000Z",
        "updated": "2023-11-22T12:54:09.477000Z",
        "name": "Устранение прокола (заплатка)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868699Z",
      "updated": "2024-02-06T21:35:53.868703Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5275,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868716Z",
      "updated": "2024-02-06T21:35:53.868720Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5276,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868733Z",
      "updated": "2024-02-06T21:35:53.868737Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5277,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868750Z",
      "updated": "2024-02-06T21:35:53.868754Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5278,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868768Z",
      "updated": "2024-02-06T21:35:53.868772Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5279,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868785Z",
      "updated": "2024-02-06T21:35:53.868789Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5280,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868802Z",
      "updated": "2024-02-06T21:35:53.868806Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5281,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868819Z",
      "updated": "2024-02-06T21:35:53.868823Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5282,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868836Z",
      "updated": "2024-02-06T21:35:53.868840Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5283,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868853Z",
      "updated": "2024-02-06T21:35:53.868857Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5284,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868870Z",
      "updated": "2024-02-06T21:35:53.868874Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5285,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868887Z",
      "updated": "2024-02-06T21:35:53.868891Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5286,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868904Z",
      "updated": "2024-02-06T21:35:53.868908Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5287,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868921Z",
      "updated": "2024-02-06T21:35:53.868925Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5288,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868950Z",
      "updated": "2024-02-06T21:35:53.868954Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5289,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868967Z",
      "updated": "2024-02-06T21:35:53.868971Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5290,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.868985Z",
      "updated": "2024-02-06T21:35:53.868989Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5291,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869002Z",
      "updated": "2024-02-06T21:35:53.869006Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5292,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 34,
        "created": "2023-11-22T12:54:09.479000Z",
        "updated": "2023-11-22T12:54:09.479000Z",
        "name": "Устранение прокола (заплатка кордовая)",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869019Z",
      "updated": "2024-02-06T21:35:53.869023Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5293,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869036Z",
      "updated": "2024-02-06T21:35:53.869040Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5294,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869053Z",
      "updated": "2024-02-06T21:35:53.869057Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5295,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869070Z",
      "updated": "2024-02-06T21:35:53.869074Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5296,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869087Z",
      "updated": "2024-02-06T21:35:53.869091Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5297,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869104Z",
      "updated": "2024-02-06T21:35:53.869108Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5298,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869121Z",
      "updated": "2024-02-06T21:35:53.869125Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5299,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869138Z",
      "updated": "2024-02-06T21:35:53.869142Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5300,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869155Z",
      "updated": "2024-02-06T21:35:53.869159Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5301,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869172Z",
      "updated": "2024-02-06T21:35:53.869176Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5302,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869189Z",
      "updated": "2024-02-06T21:35:53.869193Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5303,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869206Z",
      "updated": "2024-02-06T21:35:53.869210Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5304,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869223Z",
      "updated": "2024-02-06T21:35:53.869227Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5305,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869240Z",
      "updated": "2024-02-06T21:35:53.869244Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5306,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869257Z",
      "updated": "2024-02-06T21:35:53.869261Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5307,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869274Z",
      "updated": "2024-02-06T21:35:53.869278Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5308,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869291Z",
      "updated": "2024-02-06T21:35:53.869295Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5309,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869308Z",
      "updated": "2024-02-06T21:35:53.869312Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5310,
      "service_subtype": {
        "id": 10,
        "created": "2023-11-22T12:43:31.511000Z",
        "updated": "2023-11-22T12:54:09.459000Z",
        "name": "Ремонт колеса",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 35,
        "created": "2023-11-22T12:54:09.482000Z",
        "updated": "2023-11-22T12:54:09.482000Z",
        "name": "Ремонт бокового пореза",
        "is_common": false,
        "is_active": true,
        "service_subtype": 10
      },
      "created": "2024-02-06T21:35:53.869325Z",
      "updated": "2024-02-06T21:35:53.869329Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5311,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869343Z",
      "updated": "2024-02-06T21:35:53.869347Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5312,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869360Z",
      "updated": "2024-02-06T21:35:53.869364Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5313,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869377Z",
      "updated": "2024-02-06T21:35:53.869381Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5314,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869394Z",
      "updated": "2024-02-06T21:35:53.869398Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5315,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869411Z",
      "updated": "2024-02-06T21:35:53.869415Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5316,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869428Z",
      "updated": "2024-02-06T21:35:53.869432Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5317,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869445Z",
      "updated": "2024-02-06T21:35:53.869449Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5318,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869462Z",
      "updated": "2024-02-06T21:35:53.869466Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5319,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869479Z",
      "updated": "2024-02-06T21:35:53.869483Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5320,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869496Z",
      "updated": "2024-02-06T21:35:53.869500Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5321,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869514Z",
      "updated": "2024-02-06T21:35:53.869518Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5322,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869531Z",
      "updated": "2024-02-06T21:35:53.869535Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5323,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869548Z",
      "updated": "2024-02-06T21:35:53.869552Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5324,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869565Z",
      "updated": "2024-02-06T21:35:53.869570Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5325,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869583Z",
      "updated": "2024-02-06T21:35:53.869586Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5326,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869600Z",
      "updated": "2024-02-06T21:35:53.869604Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5327,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869617Z",
      "updated": "2024-02-06T21:35:53.869621Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5328,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 36,
        "created": "2023-11-22T12:54:31.709000Z",
        "updated": "2023-11-22T12:54:31.709000Z",
        "name": "Правка литого диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869634Z",
      "updated": "2024-02-06T21:35:53.869638Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5329,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869651Z",
      "updated": "2024-02-06T21:35:53.869655Z",
      "amount": 0,
      "radius": "R15C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5330,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869668Z",
      "updated": "2024-02-06T21:35:53.869673Z",
      "amount": 0,
      "radius": "R16C",
      "car_type": "коммерческий",
      "price": 32
    },
    {
      "id": 5331,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869685Z",
      "updated": "2024-02-06T21:35:53.869689Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5332,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869702Z",
      "updated": "2024-02-06T21:35:53.869706Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5333,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869719Z",
      "updated": "2024-02-06T21:35:53.869723Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5334,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869736Z",
      "updated": "2024-02-06T21:35:53.869740Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5335,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869754Z",
      "updated": "2024-02-06T21:35:53.869758Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5336,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869771Z",
      "updated": "2024-02-06T21:35:53.869775Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5337,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869788Z",
      "updated": "2024-02-06T21:35:53.869792Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5338,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869805Z",
      "updated": "2024-02-06T21:35:53.869809Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "легковой",
      "price": 32
    },
    {
      "id": 5339,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869822Z",
      "updated": "2024-02-06T21:35:53.869826Z",
      "amount": 0,
      "radius": "R14",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5340,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869839Z",
      "updated": "2024-02-06T21:35:53.869843Z",
      "amount": 0,
      "radius": "R15",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5341,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869856Z",
      "updated": "2024-02-06T21:35:53.869860Z",
      "amount": 0,
      "radius": "R16",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5342,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869875Z",
      "updated": "2024-02-06T21:35:53.869880Z",
      "amount": 0,
      "radius": "R17",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5343,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869893Z",
      "updated": "2024-02-06T21:35:53.869897Z",
      "amount": 0,
      "radius": "R18",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5344,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869913Z",
      "updated": "2024-02-06T21:35:53.869917Z",
      "amount": 0,
      "radius": "R19",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5345,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869932Z",
      "updated": "2024-02-06T21:35:53.869936Z",
      "amount": 0,
      "radius": "R20",
      "car_type": "внедорожный",
      "price": 32
    },
    {
      "id": 5346,
      "service_subtype": {
        "id": 11,
        "created": "2023-11-22T12:43:31.512000Z",
        "updated": "2023-11-22T12:54:31.698000Z",
        "name": "Правка диска",
        "is_common": false,
        "in_price": false,
        "is_active": true,
        "service_type": 2
      },
      "service_option": {
        "id": 37,
        "created": "2023-11-22T12:54:31.715000Z",
        "updated": "2023-11-22T12:54:31.715000Z",
        "name": "Правка стального диска",
        "is_common": false,
        "is_active": true,
        "service_subtype": 11
      },
      "created": "2024-02-06T21:35:53.869949Z",
      "updated": "2024-02-06T21:35:53.869954Z",
      "amount": 0,
      "radius": "R21-23",
      "car_type": "внедорожный",
      "price": 32
    }
  ]
}
//@ts-ignore
export function translite(str:any){let sp = '_';let text = str.toLowerCase();let transl = { '\u0430': 'a', '\u0431': 'b', '\u0432': 'v', '\u0433': 'g', '\u0434': 'd', '\u0435': 'e', '\u0451': 'e', '\u0436': 'zh', '\u0437': 'z', '\u0438': 'i', '\u0439': 'j', '\u043a': 'k', '\u043b': 'l', '\u043c': 'm', '\u043d': 'n', '\u043e': 'o', '\u043f': 'p', '\u0440': 'r', '\u0441': 's', '\u0442': 't', '\u0443': 'u', '\u0444': 'f', '\u0445': 'h', '\u0446': 'c', '\u0447': 'ch', '\u0448': 'sh', '\u0449': 'shch', '\u044a': '\'', '\u044b': 'y', '\u044c': '', '\u044d': 'e', '\u044e': 'yu', '\u044f': 'ya', '\u00AB':'_', '\u00BB':'_', /* «» */ ' ': sp, '_': sp, '`': sp, '~': sp, '!': sp, '@': sp, '#': sp, '$': sp, '%': sp, '^': sp, '&': sp, '*': sp, '(': sp, ')': sp, '-': sp, '\=': sp, '+': sp, '[': sp, ']': sp, '\\': sp, '|': sp, '/': sp, '.': sp, ',': sp, '{': sp, '}': sp, '\'': sp, '"': sp, ';': sp, ':': sp, '?': sp, '<': sp, '>': sp, '№': sp }; let result = '';let curent_sim = '';for(let i=0; i < text.length; i++) if(transl[text[i]] != undefined) {      if(curent_sim != transl[text[i]] || curent_sim != sp){        result += transl[text[i]];        curent_sim = transl[text[i]];      }    } else {      result += text[i];      curent_sim = text[i];}result = result.replace(/^_/, '').replace(/_$/, ''); /* trim */return result}


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
