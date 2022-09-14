import { Flex, Stack, Text } from "@chakra-ui/layout"
import { chakra } from "@chakra-ui/system"
import Portal from "@reach/portal"
import * as hoverCard from "@zag-js/hover-card"
import { normalizeProps, useMachine } from "@zag-js/react"
import { useId } from "react"

type HoverCardProps = {
  controls: {
    openDelay: number
    closeDelay: number
  }
}

export function HoverCard(props: HoverCardProps) {
  const [state, send] = useMachine(hoverCard.machine({ id: useId() }), {
    context: props.controls,
  })

  const api = hoverCard.connect(state, send, normalizeProps)

  return (
    <div>
      <chakra.a
        href="https://twitter.com/zag_js"
        target="_blank"
        rel="noreferrer noopener"
        {...api.triggerProps}
      >
        <chakra.img
          alt="Twitter"
          src="/favicon/apple-touch-icon.png"
          rounded="full"
          boxSize="12"
          shadow="xl"
        />
      </chakra.a>

      {api.isOpen && (
        <Portal>
          <div {...api.positionerProps}>
            <chakra.div
              bg="white"
              padding="4"
              borderWidth="1px"
              filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 15%))"
              zIndex="50"
              position="relative"
              maxW="min(calc(100vw - 16px), 360px)"
              width="full"
              rounded="md"
              {...api.contentProps}
            >
              <chakra.div
                sx={{ "--arrow-background": "white", "--arrow-size": "8px" }}
                {...api.arrowProps}
              >
                <chakra.div rounded="sm" {...api.innerArrowProps} />
              </chakra.div>
              <Stack spacing="3">
                <chakra.img
                  alt="Twitter"
                  src="/favicon/apple-touch-icon.png"
                  rounded="full"
                  boxSize="14"
                />
                <Stack spacing="4">
                  <Text>
                    <Text fontWeight="bold">Zag JS</Text>
                    <Text color="gray.500"> @zag_js</Text>
                  </Text>
                  <Text>
                    <Text>UI components powered by Finite State Machines.</Text>
                    Created by{" "}
                    <chakra.a
                      href="https://twitter.com/thesegunadebayo"
                      target="_blank"
                      rel="noreferrer noopener"
                      color="royalblue"
                    >
                      @thesegunadebayo
                    </chakra.a>
                  </Text>
                  <Flex gap="4">
                    <Flex gap="1.5">
                      <Text fontWeight="bold">2</Text>{" "}
                      <Text color="gray.500">Following</Text>
                    </Flex>
                    <Flex gap="1.5">
                      <Text fontWeight="bold">4,000</Text>{" "}
                      <Text color="gray.500">Followers</Text>
                    </Flex>
                  </Flex>
                </Stack>
              </Stack>
            </chakra.div>
          </div>
        </Portal>
      )}
    </div>
  )
}
