// bg-zinc-900 border-zinc-900
// bg-blue-950 border-blue-950
// bg-rose-950 border-rose-950

import { PRODUCT_PRICES } from "@/config/products"


export const COLORS = [
  { label: "Black", value: "black", tw: "zinc-900"} ,
  { label: "Blue", value: "blue", tw: "blue-950" },
  { label: "Rose", value: "rose", tw: "rose-950" },
] as const
// by saying cosnt we are saying thse are ecaxt array of string , not some object or string any object of string

export const MODELS = {
  name : "models" ,
  options : [
    {
      lable : "iphone X" ,
      value : "iphonex" ,
    },
    {
      lable : "iphone 11" ,
      value : "iphone11" ,
    },
    {
      lable : "iphone 12" ,
      value : "iphone12" ,
    },
    {
      lable : "iphone 13" ,
      value : "iphone13" ,
    },
    {
      lable : "iphone 14" ,
      value : "iphone14" ,
    },
    {
      lable : "iphone 15" ,
      value : "iphone15" ,
    },
  ]
} as const


export const MATERIALS = {
  name : "material" , 
  options : [
    {
      label : "Silicon",
      value : "silicone" , 
      description : undefined ,
      price : PRODUCT_PRICES.material.silicon ,
    },
    {
      label : "Softpolycarbonate",
      value : "polycarbonate" , 
      description : "scratched resisted coating " ,
      price : PRODUCT_PRICES.material.polycarbonate ,
    },
  ]
} as const 

export const FINISHES = {
  name : "material" , 
  options : [
    {
      label : "smooth finish",
      value : "smooth" , 
      description : undefined ,
      price : PRODUCT_PRICES.finish.smooth ,
    },
    {
      label : "textured finish",
      value : "textured" , 
      description : "something like texture " ,
      price : PRODUCT_PRICES.finish.textured ,
    },
  ]
} as const 