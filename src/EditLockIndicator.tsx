"use client";

import { AlertTriangle, Eye, Edit3 } from "lucide-react";
import { Button } from "./Button";

export interface EditLockIndicatorProps {
  /** Name/email of the user who is currently editing */
  lockedBy: string;
  /** Message shown, e.g. "{user} is currently editing". Default: "{lockedBy} muokkaa parhaillaan" */
  message?: string;
  /** Label for read-only button. Default: "Vain luku" */
  readOnlyLabel?: string;
  /** Label for edit-anyway button. Default: "Muokkaa silti" */
  editAnywayLabel?: string;
  onReadOnly: () => void;
  onEditAnyway: () => void;
}

/**
 * Musakonttori EditLockIndicator - muokkauslukon ilmaisin.
 *
 * Näyttää varoituksen kun toinen käyttäjä muokkaa samaa tietuetta.
 *
 * @example
 * <EditLockIndicator
 *   lockedBy="Matti Meikäläinen"
 *   onReadOnly={() => setMode("read")}
 *   onEditAnyway={() => setMode("edit")}
 * />
 */
export function EditLockIndicator({
  lockedBy,
  message,
  readOnlyLabel = "Vain luku",
  editAnywayLabel = "Muokkaa silti",
  onReadOnly,
  onEditAnyway,
}: EditLockIndicatorProps) {
  const msg = message ?? `${lockedBy} muokkaa parhaillaan`;

  return (
    <div className="rounded-lg border border-yellow-300 bg-yellow-50 dark:bg-yellow-950/20 p-3 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-yellow-600 shrink-0" />
      <div className="flex-1">
        <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
          {msg}
        </p>
      </div>
      <div className="flex gap-2">
        <Button size="sm" variant="outline" onClick={onReadOnly}>
          <Eye className="h-3.5 w-3.5 mr-1" />
          {readOnlyLabel}
        </Button>
        <Button size="sm" variant="outline" onClick={onEditAnyway}>
          <Edit3 className="h-3.5 w-3.5 mr-1" />
          {editAnywayLabel}
        </Button>
      </div>
    </div>
  );
}
