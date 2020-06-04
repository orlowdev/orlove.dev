import React, { FC } from 'react'

interface ICoffeeCupsProps {
  timeToRead: number
}

export const CoffeeCups: FC<ICoffeeCupsProps> = ({ timeToRead }) => (
  <span>{'☕️ '.repeat(Math.ceil(timeToRead / 10))}</span>
)
