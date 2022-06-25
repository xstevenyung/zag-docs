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
        sx={{
          "--checked-color": "var(--colors-blue-500)",
          "&[data-disabled]": { cursor: "not-allowed", opacity: 0.4 },
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
          sx={{
            '[data-part="input"]:focus-visible ~ &': {
              outline: "2px solid royalblue",
            },
            "&[data-hover]": {
              bg: "gray.100",
            },
            "&[data-disabled]": {
              bg: "gray.300",
              borderColor: "gray.300",
            },
            "&[data-checked]": {
              bg: "var(--checked-color)",
              borderColor: "var(--checked-color)",
              "&[data-disabled]": {
                bg: "gray.400",
                borderColor: "gray.400",
              },
            },
            "&[data-checked]:after": {
              display: "block",
            },
            "&[data-indeterminate]": {
              backgroundColor: "white",
              borderColor: "grey",
            },
            "&[data-indeterminate]:after": {
              display: "block",
              left: "50%",
              top: "50%",
              width: "13px",
              height: "3px",
              border: "none",
              backgroundColor: "grey",
              transform: "translate(-50%, -50%)",
            },
          }}
          _after={{
            content: '""',
            position: "absolute",
            display: "none",
            left: "9px",
            top: "5px",
            width: "5px",
            height: "10px",
            border: "solid white",
            borderWidth: "0 3px 3px 0",
            webkitTransform: "rotate(45deg)",
            msTransform: "rotate(45deg)",
            transform: "rotate(45deg)",
          }}
          {...api.controlProps}
        />
      </chakra.label>
    </div>
  )
}
