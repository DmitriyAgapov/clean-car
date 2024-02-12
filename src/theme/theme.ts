import { createTheme, Input, Combobox, Select, DEFAULT_THEME, mergeMantineTheme, Checkbox, Textarea } from "@mantine/core";

const themeOverride = createTheme({
    components: {
        Input: Input.extend({
            classNames: {
                input: 'text-gray-2 font-medium !placeholder:text-gray-3',
            },
        }),
        Select: Select.extend({
            classNames: {
                input: 'bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
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
        TextInput: Input.extend({
            classNames: {
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
        InputBase: Input.extend({
            classNames: {
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
        Textarea: Textarea.extend({
            classNames: {
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] h-full min-h-[6rem] overflow-hidden border-color-[var(--formBorder)] h-10',
            }
        }),
        TimeInput: Input.extend({
            classNames: {
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
        Checkbox: Checkbox.extend({
            classNames: {
                body: 'flex items-center relative z-10 ',
                root: 'relative cursor-pointer',
                label: 'relative cursor-pointer mb-0 font-base font-normal ',
                inner: 'w-4 h-4 rounded-none relative  outline outline-offset-4 !border-0 outline-1 outline-gray-3  flex items-center justify-center border border-gray-3',
                input: 'w-3.5 h-3.5 rounded-none absolute bg-accent cursor-pointer opacity-0 !border-0 checked:scale-100 checked:!opacity-100 transition-all duration-500 ease-in-out',
                icon: 'hidden',
            }
        }),
        NumberInput: Input.extend({
            classNames: {
                input: 'text-gray-2 font-medium !placeholder:text-gray-3 bg-white data-[disabled=true]:bg-white rounded-[0.625rem] border-color-[var(--formBorder)] h-10',
            }
        }),
    },
    fontFamily: 'Montserrat',

});
const newTheme = mergeMantineTheme({ ...DEFAULT_THEME }, { ...themeOverride });
// const newTheme = themeOverride;
export default newTheme;
