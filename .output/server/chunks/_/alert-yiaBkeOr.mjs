import { jsx, Fragment } from 'react/jsx-runtime';
import { FormApi, functionalUpdate, FieldApi } from '@tanstack/form-core';
import { useStore } from '@tanstack/react-store';
import { useState, useEffect, useMemo } from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { c as cn } from './ssr.mjs';
import { cva } from 'class-variance-authority';

const useIsomorphicLayoutEffect = useEffect;
function useField(opts) {
  const [fieldApi] = useState(() => {
    const api = new FieldApi({
      ...opts,
      form: opts.form,
      name: opts.name
    });
    const extendedApi = api;
    extendedApi.Field = Field;
    return extendedApi;
  });
  useIsomorphicLayoutEffect(fieldApi.mount, [fieldApi]);
  useIsomorphicLayoutEffect(() => {
    fieldApi.update(opts);
  });
  useStore(
    fieldApi.store,
    opts.mode === "array" ? (state) => {
      var _a;
      return [
        state.meta,
        Object.keys((_a = state.value) != null ? _a : []).length
      ];
    } : void 0
  );
  return fieldApi;
}
const Field = (({
  children,
  ...fieldOptions
}) => {
  const fieldApi = useField(fieldOptions);
  const jsxToDisplay = useMemo(
    () => functionalUpdate(children, fieldApi),
    /**
     * The reason this exists is to fix an issue with the React Compiler.
     * Namely, functionalUpdate is memoized where it checks for `fieldApi`, which is a static type.
     * This means that when `state.value` changes, it does not trigger a re-render. The useMemo explicitly fixes this problem
     */
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [children, fieldApi, fieldApi.state.value, fieldApi.state.meta]
  );
  return /* @__PURE__ */ jsx(Fragment, { children: jsxToDisplay });
});
function LocalSubscribe({
  form,
  selector,
  children
}) {
  const data = useStore(form.store, selector);
  return functionalUpdate(children, data);
}
function useForm(opts) {
  const [formApi] = useState(() => {
    const api = new FormApi(opts);
    const extendedApi = api;
    extendedApi.Field = function APIField(props) {
      return /* @__PURE__ */ jsx(Field, { ...props, form: api });
    };
    extendedApi.Subscribe = function Subscribe(props) {
      return /* @__PURE__ */ jsx(
        LocalSubscribe,
        {
          form: api,
          selector: props.selector,
          children: props.children
        }
      );
    };
    return extendedApi;
  });
  useIsomorphicLayoutEffect(formApi.mount, []);
  useIsomorphicLayoutEffect(() => {
    formApi.update(opts);
  });
  return formApi;
}
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    LabelPrimitive.Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const alertVariants = cva(
  "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive: "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Alert({
  className,
  variant,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert",
      role: "alert",
      className: cn(alertVariants({ variant }), className),
      ...props
    }
  );
}
function AlertTitle({ className, ...props }) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-title",
      className: cn(
        "col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight",
        className
      ),
      ...props
    }
  );
}
function AlertDescription({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsx(
    "div",
    {
      "data-slot": "alert-description",
      className: cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      ),
      ...props
    }
  );
}

export { Alert as A, Label as L, AlertTitle as a, AlertDescription as b, useForm as u };
//# sourceMappingURL=alert-yiaBkeOr.mjs.map
