import { extendTheme, } from "@chakra-ui/react"

const Card = {
  // The styles all Cards have in common
  baseStyle: {
    display: "flex",
    flexDirection: "column",
    background: "white",
    alignItems: "center",
    gap: 6,
  },
  // Two variants: rounded and smooth
  variants: {
    rounded: {
      padding: 8,
      borderRadius: "xl",
      boxShadow: "xl",
    },
    smooth: {
      padding: 6,
      borderRadius: "base",
      boxShadow: "md",
    },
  },
  // The default variant value
  defaultProps: {
    variant: "smooth",
  },
}

const List = {
  baseStyle: {
    container: {
      background: "white",
      borderColor: "gray.50"
    },
    topBar: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      borderTop: "2px",
      borderBottom: "2px",
      borderColor: "gray.50"
    },
    bottomBar: {
      borderTop: "2px",
      borderBottom: "2px",
      borderColor: "gray.50"
    }
  },
  variants: {
    rounded: {
      container: {
        borderRadius: "xl",
        boxShadow: "xl",
      }
    },
    smooth: {
      container: {
        borderRadius: "base",
        boxShadow: "md",
      }
    }
  },
  defaultProps: {
    variant: "smooth",
  },
}

const Contacts = {
  baseStyle: {
    container: {
      background: "white",
      borderTop: "2px",
      borderColor: "gray.50",
      borderRadius: "xl",
      boxShadow: "xl",
    },
    bottomBar: {
      display: "flex",
      justifyContent: "space-around",
      alignItems: "center",
      borderTop: "2px",
      borderBottom: "2px",
      borderColor: "gray.50"
    }
  }
}

const theme = extendTheme({
  components: {
    Card,
    List,
    Contacts
  },
})

export default theme;
