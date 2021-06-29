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
      width: "100%",
      paddingBottom: "20px"
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

const EventCard = {
  baseStyle: {
    container: {
      position: "relative",
      display: "flex",
      flexDirection: "column",
      background: "#ffffff",
      alignItems: "center",
      borderRadius: "4px",
      border: "1px solid #DADAD9",
      boxShadow: "md",
      width: "100%",
      minWidth: "250px"
    },
    topbar: {
      backgroundColor: "gray.300",
      height: "6px",
      width: "100%",
      marginTop: "-1px",
      marginRight: "-1px",
      marginLeft: "-1px",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px"
    },
    checkbox: {
      position: "absolute",
      top: "5px",
      left: "0px",
      padding: "12px 16px",
      userSelect: "none",
      cursor: "pointer"
    },
    settings: {
      position: "absolute",
      top: "5px",
      right: "0"
    },
    body: {
      display: "flex",
      flex: "1 0 auto",
      flexDirection: "column",
      padding: "48px 16px 20px 16px",
      textAlign: "left",
      width: "100%"
    },
    foot: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderTop: "1px solid #DADAD9",
      width: "100%"
    },
    footCol1: {
      flex: "1",
      padding: "12px 8px 12px 16px",
      overflow: "hidden",
      color: "rgb(0, 107, 255)",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis"
    },
    footCol2: {
      padding: "12px 16px 12px 8px"
    }
  },
  variants: {
    fifteen:{
      topbar: {
        backgroundColor: "yellow.300",
      }
    },
    thirty:{
      topbar: {
        backgroundColor: "red.400",
      }
    },
    sixty:{
      topbar: {
        backgroundColor: "purple.400",
      }
    }
  }
}

const theme = extendTheme({
  components: {
    Card,
    List,
    Contacts,
    EventCard
  },
})

export default theme;
