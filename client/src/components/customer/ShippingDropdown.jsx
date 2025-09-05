import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { useShipping } from "@/context/ShippingContext";
import {formatCurrency} from "@/utils/format.js";

const ShippingDropdown = () => {
  const { shippingOptions, selectedShipping, setSelectedShipping } = useShipping();

  // Find cheapest option
  const cheapestOption = shippingOptions?.reduce(
    (min, option) => (option.cost < min.cost ? option : min),
    shippingOptions[0]
  );

  const { control, setValue } = useForm({
    defaultValues: {
      shipping: selectedShipping?.code || cheapestOption?.code || "",
    },
  });

  // Automatically select cheapest on first render
  useEffect(() => {
    if (cheapestOption && !selectedShipping) {
      setSelectedShipping(cheapestOption);
      setValue("shipping", cheapestOption.code); // update react-hook-form
    }
  }, [cheapestOption, selectedShipping, setSelectedShipping, setValue]);
  
  return (
    <Controller
      name="shipping"
      control={control}
      render={({ field }) => (
        <Select
          onValueChange={(value) => {
            field.onChange(value);
            const chosen = shippingOptions.find((s) => s.code === value);
            setSelectedShipping(chosen); // update context
          }}
          value={field.value}
        >
          <SelectTrigger className="text-left py-7 w-full justify-between rounded-lg">
            <SelectValue placeholder="Choose shipping option" className='w-full p-5' />
          </SelectTrigger>
          <SelectContent>
            {shippingOptions?.map((shipping) => (
              <SelectItem key={shipping.code} value={shipping.code}>
                <div className="grid">
                  <span className="flex gap-2">
                    <span>{shipping.name}</span>
                    <span className="font-bold">{formatCurrency(shipping.cost)}</span>
                  </span>
                  <span className="text-sm text-gray-500">
                    Est. {shipping.etd} days
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    />
  );
};

export default ShippingDropdown;
