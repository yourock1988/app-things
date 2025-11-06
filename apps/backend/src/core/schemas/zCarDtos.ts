import { z } from 'zod'

const typeSchema = z.string().min(3).max(15)
const brandSchema = z.string().min(3).max(9)
const modelSchema = z.string().min(1).max(12)
const priceSchema = z.number().positive()
const engineSchema = z.string().min(2).max(3)
const hasTurboSchema = z.boolean()
const hpSchema = z.number().min(48).max(999)

export const zCarAddDto = z
  .object({
    type: typeSchema,
    brand: brandSchema,
    model: modelSchema,
    price: priceSchema,
    engine: engineSchema,
    hasTurbo: hasTurboSchema,
    hp: hpSchema,
  })
  .strict()

export const zCarUpdateDto = z
  .object({
    price: priceSchema,
    engine: engineSchema,
    hasTurbo: hasTurboSchema,
    hp: hpSchema,
  })
  .strict()
