function Label({ title, placeholder, styles = "" }) {
  return (
    <div className="font-medium text-white w-full">
      <div className="space-y-1">
        <span className="text-muted-foreground">{title}</span>
        <div className={`border border-borderColor p-2 rounded-md px-3 py-2 w-full
          flex items-center ${styles}`}
        >
          <span className="text-white">{placeholder}</span>
        </div>
      </div>
    </div>
  )
}

export default Label