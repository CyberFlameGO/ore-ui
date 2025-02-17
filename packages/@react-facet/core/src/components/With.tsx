import { ReactElement } from 'react'
import { useFacetMap, useFacetUnwrap } from '../hooks'
import { Facet, NoValue } from '../types'

type WithProps<T> = {
  data: Facet<T | null | undefined>
  children: (data: Facet<T>) => ReactElement
}

const hasData = <T,>(_: Facet<T | null | undefined>, shouldRender: boolean | NoValue): _ is Facet<T> => {
  return shouldRender === true
}

export const With = <T,>({ data, children }: WithProps<T>) => {
  const shouldRenderFacet = useFacetMap((data) => data != null, [], [data])
  const shouldRender = useFacetUnwrap(shouldRenderFacet)
  return hasData(data, shouldRender) ? children(data) : null
}
