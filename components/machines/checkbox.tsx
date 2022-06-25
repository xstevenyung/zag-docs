import { chakra } from "@chakra-ui/system"
import * as checkbox from "@zag-js/checkbox"
import { mergeProps, useMachine, useSetup } from "@zag-js/react"

type CheckboxProps = {
  controls: {
    indeterminate: boolean
    disabled: boolean
    readonly: boolean
  }
}

export function Checkbox(props: CheckboxProps) {
  const [state, send] = useMachine(checkbox.machine, {
    context: props.controls,
  })

  const ref = useSetup<HTMLLabelElement>({ send, id: "1" })
  const api = checkbox.connect(state, send)

  const inputProps = mergeProps(api.inputProps, {
    onChange() {
      if (api.isIndeterminate && !api.isReadOnly) {
        api.setIndeterminate(false)
        api.setChecked(true)
      }
    },
  })

  return (
    <div>
      <chakra.label
        pos="relative"
        userSelect="none"
        cursor="pointer"
        fontSize="22px"
        w="fit-content"
        pl="35px"
        _disabled={{
          cursor: "not-allowed",
          opacity: 0.4,
        }}
        ref={ref}
        {...api.rootProps}
      >
        <chakra.span {...api.labelProps}>
          Input {api.isChecked ? "Checked" : "Unchecked"}
        </chakra.span>
        <input {...inputProps} />
        <chakra.div
          pos="absolute"
          top="0"
          left="0"
          boxSize="25px"
          rounded="md"
          border="solid 2px"
          borderColor="gray.400"
          _hover={{
            bg: "gray.100",
          }}
          _disabled={{
            bg: "gray.300",
            borderColor: "gray.300",
          }}
          _indeterminate={{
            backgroundColor: "white",
            borderColor: "grey",
          }}
          _checked={{
            bg: "blue.500",
            borderColor: "blue.500",
            color: "white",
            _disabled: {
              bg: "gray.400",
              borderColor: "gray.400",
            },
          }}
          sx={{
            '[data-part="input"]:focus-visible ~ &': {
              outline: "2px solid royalblue",
            },
          }}
          {...api.controlProps}
        >
          {api.view === "checked" && (
            <chakra.svg
              viewBox="0 0 24 24"
              fill="currentcolor"
              transform="scale(0.7)"
            >
              <path d="M20.285 2l-11.285 11.567-5.286-5.011-3.714 3.716 9 8.728 15-15.285z" />
            </chakra.svg>
          )}
          {api.view === "mixed" && (
            <chakra.svg
              clipRule="evenodd"
              fillRule="evenodd"
              strokeLinejoin="round"
              strokeMiterlimit="2"
              viewBox="0 0 24 24"
              fill="currentcolor"
            >
              <path
                d="m21 11.75c0-.414-.336-.75-.75-.75h-16.5c-.414 0-.75.336-.75.75s.336.75.75.75h16.5c.414 0 .75-.336.75-.75z"
                fillRule="nonzero"
              />
            </chakra.svg>
          )}
        </chakra.div>
      </chakra.label>
    </div>
  )
}
