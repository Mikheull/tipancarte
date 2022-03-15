import React, { useState, useContext} from "react";
import { useRouter } from "next/router"
import { Store } from "../../context/Store";
import Transition from '../../utils/Transition';
import { Text, Input, Button, Divider, useToasts, Spacer } from '@geist-ui/core'

export default function ProductPreviewLoading() {
  return (
    <div id="configuration">

      <div className="w-full">
        <Text h2 className="font-bitter">Détails de cette configuration</Text>
      </div>

      <div className="my-6 w-full">
          <>
            <div className="block lg:flex">
              <div className={`lg:w-7/12 flex items-center justify-center w-full plank plank-right animate-pulse bg-slate-200 h-48`}>
              </div>
            </div>
            <div className="block lg:flex mt-6">
              <div className={`lg:w-7/12 flex items-center justify-center w-full plank plank-left animate-pulse bg-slate-200 h-48`}>
              </div>
            </div>
          </>
      </div>
    
      <div className="md:w-1/3 w-full">
        <Spacer h={2}/>
      </div>
    </div>
  );
}
