function InformationCard({ title, text }) {
  return (
    <div className="relative overflow-hidden rounded-[10px] border border-borderColor p-2">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <div className="space-y-2">
          <h3 className="font-bold font-manrope">{title}</h3>
          <p className="text-sm text-muted-foreground">
            {text}
          </p>
        </div>
      </div>
    </div>
  )
}

export default InformationCard