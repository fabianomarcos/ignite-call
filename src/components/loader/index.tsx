import { Cube } from 'phosphor-react'
import { LoaderContainer } from './styles'

export function Loader() {
  return (
    <LoaderContainer>
      <Cube color="darkorchid" weight="duotone" size={100}>
        <animate
          attributeName="opacity"
          values="0.5;1;1"
          dur="4s"
          repeatCount="indefinite"
        ></animate>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="rotate"
          dur="3s"
          from="0 0 0"
          to="360 0 0"
          repeatCount="indefinite"
        ></animateTransform>
      </Cube>
    </LoaderContainer>
  )
}
