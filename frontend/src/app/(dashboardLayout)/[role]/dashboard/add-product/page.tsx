import AddProductForm from "@/components/modules/Add-Product";

function ProductPage() {
  return (
    <div className="min-h-screen mt-2 bg-gradient-to-br from-background via-background to-muted/30">
      <div className="w-full mx-auto">
        <AddProductForm />
      </div>
    </div>
  )
}

export default ProductPage;