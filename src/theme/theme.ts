import {
    createTheme,
    Input,
    InputLabel,
    Combobox,
    Select,
    DEFAULT_THEME,
    mergeMantineTheme,
    Checkbox,
    Textarea,
    Notification,
    TextInput,
    Popover,
    InputBase,
    NumberInput,
    Modal,
    Radio,
    PasswordInput,
    Switch,
} from '@mantine/core'
import { DateTimePicker, TimeInput } from '@mantine/dates'

// @ts-ignore
const themeOverride = createTheme({

    components: {

        InputLabel: InputLabel.extend({
            classNames: {
                label: 'font-semibold',
            }
        }),
        Input: Input.extend({
            classNames: {
                wrapper: "",
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 tablet-max:text-base',
            },
        }),
        Select: Select.extend({
            defaultProps: {
                withCheckIcon: false,
                
            },

            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4 wrapper-custom tablet-max:!flex-1',
                wrapper: ' !mb-0 ',
                input: ' bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10  tablet-max:text-base',
                dropdown: '!bg-white rounded-[0.625rem]',
                option: 'tracking-input text-gray-2 hover:!bg-transparent hover:!text-accent data-[checked=true]:text-accent focus:!bg-transparent focus:!text-accent  tablet-max:text-base',
            }
        }),
        Combobox: Combobox.extend({
            classNames: {

                header: 'text-gray-3',
                search: 'bg-white focus:filter-none',
                dropdown: '!bg-white rounded-[0.625rem]',
                footer: 'text-gray-2 border-0',
                option: 'tracking-input text-gray-2 hover:!bg-transparent hover:!text-accent focus:!bg-transparent focus:!text-accent',
            },
            defaultProps: {
              transitionProps: { transition: 'fade', duration: 200 },
                 withinPortal: false,
        }}),
        Radio: Radio.extend({
            classNames: {
                label: 'font-semibold cursor-pointer ',
                error: 'form-error block',
                radio: 'p-0 bg-gray-3 border-transparent checked:border-accent',
                icon: 'text-accent',

            }
        }),
        RadioGroup: Radio.Group.extend({
           classNames: {
               label: 'font-semibold text-accent font-sans',
           }
        }),
        TextInput: TextInput.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10  tablet-max:text-base',
            }
        }),
        Modal: Modal.extend({
            classNames: {
                root: '',
                content: 'rounded-xl !bg-[#242529]',
                body: 'py-6 px-6'
            }
        }),
        InputBase: InputBase.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10  tablet-max:text-base',
            }
        }),
        Textarea: Textarea.extend({
            classNames: {
                root: '*:data-[error=true]:text-error relative !mb-0 !pb-4 wrapper-custom tablet-max:!flex-1',
                error: 'form-error block',
                label: 'font-semibold',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] h-full min-h-[6rem] overflow-hidden border-color-[var(--formBorder)] h-10  tablet-max:text-base',
            }
        }),
        PasswordInput: PasswordInput.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10  tablet-max:text-base',
                visibilityToggle: 'text-gray-2'
            }
        }),
        Notification: Notification.extend({
            classNames: {
                root: "rounded-[.625rem] pt-1.5 pl-3 pr-4  border-[var(--notification-color)] border bg-black max-w-[20rem] min-h-[4.5rem] before:left-0 before:right-0 before:bottom-0  before:top-auto before:w-full before:h-3  before:animate-progressFive before:bg-gradient-to-r before:from-[var(--notification-color)] before:to-black/90 before:rounded-tl-none before:rounded-tr-none before:h-2 ",
                title: "text-sm",
                body: ' pt-0 ',
                closeButton: "top-1 right-1 absolute text-gray-2 *:!w-5 *:!h-5",
            }
        }),
        TimeInput: TimeInput.extend({
            classNames: {

                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10  tablet-max:text-base',
            }
        }),
        DateTimePicker: DateTimePicker.extend({
            classNames: {
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4 wrapper-custom tablet-max:!flex-1',
            }
        }),
        Checkbox: Checkbox.extend({
            classNames: {
                body: 'flex items-center relative z-10 ',
                root: 'relative cursor-pointer',
                label: 'relative cursor-pointer mb-0 font-base font-normal  font-semibold',
                inner: 'rounded-none relative outline outline-offset-0 outline-1 !outline-[#6b6b6b]  flex items-center justify-center',
                input: ' rounded-none  !border-gray-3 checked:!bg-accent cursor-pointer opacity-0 border-4 checked:!border-3 checked:!opacity-100 transition-all duration-500 ease-in-out',
                icon: 'hidden',
            }
        }),
        Switch: Switch.extend({
            defaultProps: {
                classNames: {
                    track: "#ffa900"
                }
            }
        }),
        NumberInput: InputBase.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10  tablet-max:text-base',
            }
        }),
    },
    fontFamily: 'Montserrat',


});
const newTheme = mergeMantineTheme({ ...DEFAULT_THEME }, { ...themeOverride });
// const newTheme = themeOverride;
export default newTheme;
