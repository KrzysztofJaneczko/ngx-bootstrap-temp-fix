import { Directive, ElementRef, forwardRef, Host, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { formatDate } from '../bs-moment/format';
import { getLocale } from '../bs-moment/locale/locales.service';
import { BsDaterangepickerComponent } from './bs-daterangepicker.component';
var BS_DATERANGEPICKER_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line
    useExisting: forwardRef(function () { return BsDaterangepickerInputDirective; }),
    multi: true
};
var BsDaterangepickerInputDirective = (function () {
    function BsDaterangepickerInputDirective(_picker, _renderer, _elRef) {
        this._picker = _picker;
        this._renderer = _renderer;
        this._elRef = _elRef;
        this._onChange = Function.prototype;
        this._onTouched = Function.prototype;
    }
    BsDaterangepickerInputDirective.prototype.ngOnInit = function () {
        var _this = this;
        this._picker.bsValueChange.subscribe(function (v) {
            var range = '';
            if (v) {
                var start = formatDate(v[0], _this._picker._config.rangeInputFormat, _this._picker._config.locale) || '';
                var end = formatDate(v[1], _this._picker._config.rangeInputFormat, _this._picker._config.locale) || '';
                range = (start && end) ? start + _this._picker._config.rangeSeparator + end : '';
            }
            _this._renderer.setProperty(_this._elRef.nativeElement, 'value', range);
            _this._onChange(v);
        });
    };
    BsDaterangepickerInputDirective.prototype.onChange = function (event) {
        this.writeValue(event.target.value);
        this._onTouched();
    };
    BsDaterangepickerInputDirective.prototype.writeValue = function (value) {
        if (!value) {
            this._picker.bsValue = null;
            return;
        }
        var _locale = getLocale(this._picker._config.locale);
        if (!_locale) {
            throw new Error("Locale \"" + this._picker._config
                .locale + "\" is not defined, please add it with \"defineLocale(...)\"");
        }
        if (typeof value === 'string') {
            this._picker.bsValue = value
                .split(this._picker._config.rangeSeparator)
                .map(function (date) { return new Date(_locale.preparse(date)); })
                .map(function (date) { return (isNaN(date.valueOf()) ? null : date); });
        }
        if (Array.isArray(value)) {
            this._picker.bsValue = value;
        }
    };
    BsDaterangepickerInputDirective.prototype.setDisabledState = function (isDisabled) {
        this._picker.isDisabled = isDisabled;
        if (isDisabled) {
            this._renderer.setAttribute(this._elRef.nativeElement, 'disabled', 'disabled');
            return;
        }
        this._renderer.removeAttribute(this._elRef.nativeElement, 'disabled');
    };
    BsDaterangepickerInputDirective.prototype.registerOnChange = function (fn) {
        this._onChange = fn;
    };
    BsDaterangepickerInputDirective.prototype.registerOnTouched = function (fn) {
        this._onTouched = fn;
    };
    BsDaterangepickerInputDirective.prototype.onBlur = function () {
        this._onTouched();
    };
    BsDaterangepickerInputDirective.prototype.hide = function () {
        this._picker.hide();
    };
    BsDaterangepickerInputDirective.decorators = [
        { type: Directive, args: [{
                    selector: "input[bsDaterangepicker]",
                    host: {
                        '(change)': 'onChange($event)',
                        '(keyup.esc)': 'hide()',
                        '(blur)': 'onBlur()'
                    },
                    providers: [BS_DATERANGEPICKER_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    BsDaterangepickerInputDirective.ctorParameters = function () { return [
        { type: BsDaterangepickerComponent, decorators: [{ type: Host },] },
        { type: Renderer2, },
        { type: ElementRef, },
    ]; };
    return BsDaterangepickerInputDirective;
}());
export { BsDaterangepickerInputDirective };
//# sourceMappingURL=bs-daterangepicker-input.directive.js.map