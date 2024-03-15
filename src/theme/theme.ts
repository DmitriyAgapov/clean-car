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
    TextInput,
    Popover,
    InputBase,
    NumberInput,
    Modal,
} from '@mantine/core'
import { TimeInput } from '@mantine/dates';

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
                input: 'text-gray-2 font-medium !placeholder:text-gray-3',
            },
        }),
        Select: Select.extend({
            defaultProps: {
                withCheckIcon: false
            },
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: ' bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
                dropdown: '!bg-white rounded-[0.625rem]',
                option: 'tracking-input text-gray-2 hover:!bg-transparent hover:!text-accent data-[checked=true]:text-accent focus:!bg-transparent focus:!text-accent',
            }
        }),
        Combobox: Combobox.extend({
            classNames: {
                header: 'text-gray-3',
                search: 'bg-white focus:filter-none',
                dropdown: '!bg-white rounded-[0.625rem]',
                footer: 'text-gray-2 border-0',
                option: 'tracking-input text-gray-2 hover:!bg-transparent hover:!text-accent focus:!bg-transparent focus:!text-accent',
            }
        }),

        TextInput: TextInput.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
        Modal: Modal.extend({
            classNames: {
                root: '',
                content: 'rounded-xl !bg-[#242529]',
                body: 'py-6 px-6'
            }
        }),
        Popover: Popover.extend({
           classNames: {
               dropdown: ' p-8'
           }
        }),
        InputBase: InputBase.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
        Textarea: Textarea.extend({
            classNames: {
                label: 'font-semibold',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] h-full min-h-[6rem] overflow-hidden border-color-[var(--formBorder)] h-10',
            }
        }),
        TimeInput: TimeInput.extend({
            classNames: {

                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
        Checkbox: Checkbox.extend({
            classNames: {
                body: 'flex items-center relative z-10 ',
                root: 'relative cursor-pointer',
                label: 'relative cursor-pointer mb-0 font-base font-normal  font-semibold',
                inner: 'w-4 h-4 rounded-none relative  outline outline-offset-4 !border-0 outline-1 outline-gray-3  flex items-center justify-center border border-gray-3',
                input: 'w-3.5 h-3.5 rounded-none absolute bg-accent cursor-pointer opacity-0 !border-0 checked:scale-100 checked:!opacity-100 transition-all duration-500 ease-in-out',
                icon: 'hidden',
            }
        }),
        NumberInput: InputBase.extend({
            classNames: {
                label: 'font-semibold',
                error: 'form-error block',
                root: '*:data-[error=true]:text-error relative !mb-0 pb-4',
                wrapper: ' !mb-0 ',
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
    },
    fontFamily: 'Montserrat',


});
const newTheme = mergeMantineTheme({ ...DEFAULT_THEME }, { ...themeOverride });
// const newTheme = themeOverride;
export default newTheme;
