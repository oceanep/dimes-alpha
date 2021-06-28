import {
  useStyleConfig,
  Box
} from "@chakra-ui/react"

function Card(props) {

  const { variant } = props
  const styles = useStyleConfig("Card", { variant })

  return (
    <Box __css={styles} {...props} />
  )

}

export default Card;
