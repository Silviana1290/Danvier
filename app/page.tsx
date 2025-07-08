"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { HelpCircle, X, CheckCircle2, TrendingUp, Factory, DollarSign, Settings, Globe } from "lucide-react"

interface FormData {
  companyName: string
  industryType: string
  companySize: string
  operatingYears: string
  monthlyOutput: string
  productionCapacity: string
  capacityUtilization: string
  productionEfficiency: string
  defectRate: string
  reworkRate: string
  customerSatisfaction: string
  returnRate: string
  monthlyRevenue: string
  productionCost: string
  profitMargin: string
  operationalCost: string
  employeeCount: string
  machineHours: string
  downtimeHours: string
  maintenanceFreq: string
  marketDemand: string
  competitionLevel: string
  economicCondition: string
  seasonality: string
  additionalNotes: string
}

export default function ManufacturingPredictionForm() {
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    industryType: "",
    companySize: "",
    operatingYears: "",
    monthlyOutput: "",
    productionCapacity: "",
    capacityUtilization: "",
    productionEfficiency: "",
    defectRate: "",
    reworkRate: "",
    customerSatisfaction: "",
    returnRate: "",
    monthlyRevenue: "",
    productionCost: "",
    profitMargin: "",
    operationalCost: "",
    employeeCount: "",
    machineHours: "",
    downtimeHours: "",
    maintenanceFreq: "",
    marketDemand: "",
    competitionLevel: "",
    economicCondition: "",
    seasonality: "",
    additionalNotes: "",
  })

  const [showHelp, setShowHelp] = useState(false)
  const [predictionResult, setPredictionResult] = useState<{
    score: number
    category: string
    recommendations: string
    color: string
  } | null>(null)

  // Auto-calculate capacity utilization
  useEffect(() => {
    const output = Number.parseFloat(formData.monthlyOutput) || 0
    const capacity = Number.parseFloat(formData.productionCapacity) || 0

    if (capacity > 0) {
      const utilization = (output / capacity) * 100
      setFormData((prev) => ({
        ...prev,
        capacityUtilization: utilization.toFixed(1),
      }))
    }
  }, [formData.monthlyOutput, formData.productionCapacity])

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const calculatePerformanceScore = (data: FormData): number => {
    let score = 50 // Base score

    // Production factors
    if (data.capacityUtilization) {
      score += (Number.parseFloat(data.capacityUtilization) - 50) * 0.3
    }

    if (data.productionEfficiency) {
      score += (Number.parseFloat(data.productionEfficiency) - 50) * 0.4
    }

    // Quality factors
    if (data.defectRate) {
      score -= Number.parseFloat(data.defectRate) * 2
    }

    if (data.customerSatisfaction) {
      score += (Number.parseFloat(data.customerSatisfaction) - 5) * 5
    }

    // Financial factors
    if (data.profitMargin) {
      score += Number.parseFloat(data.profitMargin) * 0.5
    }

    // External factors
    const demandMultiplier: Record<string, number> = {
      very_low: -10,
      low: -5,
      moderate: 0,
      high: 5,
      very_high: 10,
    }

    if (data.marketDemand && demandMultiplier[data.marketDemand]) {
      score += demandMultiplier[data.marketDemand]
    }

    return Math.max(0, Math.min(100, Math.round(score)))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.companyName || !formData.industryType || !formData.monthlyOutput || !formData.productionCapacity) {
      alert("Mohon lengkapi semua field yang wajib diisi (bertanda *)")
      return
    }

    const score = calculatePerformanceScore(formData)

    let category, recommendations, color

    if (score >= 80) {
      category = "🟢 Performa Sangat Baik"
      recommendations = "Pertahankan standar operasional yang tinggi dan fokus pada inovasi berkelanjutan."
      color = "from-green-500 to-green-600"
    } else if (score >= 60) {
      category = "🟡 Performa Baik"
      recommendations = "Tingkatkan efisiensi operasional dan kurangi tingkat cacat produksi."
      color = "from-yellow-500 to-orange-500"
    } else if (score >= 40) {
      category = "🟠 Performa Sedang"
      recommendations = "Perlu perbaikan pada sistem produksi dan manajemen kualitas."
      color = "from-orange-500 to-red-500"
    } else {
      category = "🔴 Performa Rendah"
      recommendations = "Diperlukan evaluasi menyeluruh dan perbaikan sistem operasional."
      color = "from-red-500 to-red-600"
    }

    setPredictionResult({ score, category, recommendations, color })
  }

  const resetForm = () => {
    setFormData({
      companyName: "",
      industryType: "",
      companySize: "",
      operatingYears: "",
      monthlyOutput: "",
      productionCapacity: "",
      capacityUtilization: "",
      productionEfficiency: "",
      defectRate: "",
      reworkRate: "",
      customerSatisfaction: "",
      returnRate: "",
      monthlyRevenue: "",
      productionCost: "",
      profitMargin: "",
      operationalCost: "",
      employeeCount: "",
      machineHours: "",
      downtimeHours: "",
      maintenanceFreq: "",
      marketDemand: "",
      competitionLevel: "",
      economicCondition: "",
      seasonality: "",
      additionalNotes: "",
    })
    setPredictionResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-purple-800 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-slate-800 to-slate-700 text-white p-8 text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <Factory className="h-8 w-8" />
              Prediksi Performa Industri Manufaktur
            </h1>
            <p className="text-lg opacity-90 mb-4">
              Sistem Prediksi Berbasis Machine Learning untuk Analisis Performa Manufaktur
            </p>
            <Button
              onClick={() => setShowHelp(true)}
              variant="outline"
              className="bg-white/20 border-white/30 text-white hover:bg-white/30"
            >
              <HelpCircle className="h-4 w-4 mr-2" />
              Bantuan Pengisian Form
            </Button>
          </div>
        </Card>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Company Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Factory className="h-5 w-5" />
                Informasi Perusahaan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">
                    Nama Perusahaan{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      *
                    </Badge>
                  </Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Masukkan nama perusahaan"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="industryType">
                    Jenis Industri{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      *
                    </Badge>
                  </Label>
                  <Select
                    value={formData.industryType}
                    onValueChange={(value) => handleInputChange("industryType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis industri" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="automotive">Otomotif</SelectItem>
                      <SelectItem value="electronics">Elektronik</SelectItem>
                      <SelectItem value="textile">Tekstil</SelectItem>
                      <SelectItem value="food">Makanan & Minuman</SelectItem>
                      <SelectItem value="chemical">Kimia</SelectItem>
                      <SelectItem value="machinery">Mesin & Peralatan</SelectItem>
                      <SelectItem value="pharmaceutical">Farmasi</SelectItem>
                      <SelectItem value="other">Lainnya</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companySize">Ukuran Perusahaan</Label>
                  <Select
                    value={formData.companySize}
                    onValueChange={(value) => handleInputChange("companySize", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih ukuran perusahaan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="small">Kecil (&lt; 50 karyawan)</SelectItem>
                      <SelectItem value="medium">Menengah (50-250 karyawan)</SelectItem>
                      <SelectItem value="large">Besar (&gt; 250 karyawan)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operatingYears">Tahun Beroperasi</Label>
                  <Input
                    id="operatingYears"
                    type="number"
                    min="1"
                    max="100"
                    value={formData.operatingYears}
                    onChange={(e) => handleInputChange("operatingYears", e.target.value)}
                    placeholder="Tahun"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Production Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <TrendingUp className="h-5 w-5" />
                Metrik Produksi
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyOutput">
                    Output Bulanan{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      *
                    </Badge>
                  </Label>
                  <div className="relative">
                    <Input
                      id="monthlyOutput"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.monthlyOutput}
                      onChange={(e) => handleInputChange("monthlyOutput", e.target.value)}
                      placeholder="0"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      unit
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productionCapacity">
                    Kapasitas Produksi{" "}
                    <Badge variant="destructive" className="ml-1 text-xs">
                      *
                    </Badge>
                  </Label>
                  <div className="relative">
                    <Input
                      id="productionCapacity"
                      type="number"
                      min="0"
                      step="0.01"
                      value={formData.productionCapacity}
                      onChange={(e) => handleInputChange("productionCapacity", e.target.value)}
                      placeholder="0"
                      required
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      unit/bulan
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacityUtilization">Utilisasi Kapasitas</Label>
                  <div className="relative">
                    <Input
                      id="capacityUtilization"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={formData.capacityUtilization}
                      onChange={(e) => handleInputChange("capacityUtilization", e.target.value)}
                      placeholder="0"
                      className="bg-blue-50"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                  </div>
                  <p className="text-xs text-blue-600">Otomatis dihitung dari output dan kapasitas</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productionEfficiency">Efisiensi Produksi</Label>
                  <div className="relative">
                    <Input
                      id="productionEfficiency"
                      type="number"
                      min="0"
                      max="100"
                      step="0.1"
                      value={formData.productionEfficiency}
                      onChange={(e) => handleInputChange("productionEfficiency", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <CheckCircle2 className="h-5 w-5" />
                Metrik Kualitas
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="defectRate">Tingkat Cacat</Label>
                  <div className="relative">
                    <Input
                      id="defectRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.defectRate}
                      onChange={(e) => handleInputChange("defectRate", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reworkRate">Tingkat Pengerjaan Ulang</Label>
                  <div className="relative">
                    <Input
                      id="reworkRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.reworkRate}
                      onChange={(e) => handleInputChange("reworkRate", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="customerSatisfaction">Kepuasan Pelanggan</Label>
                  <div className="relative">
                    <Input
                      id="customerSatisfaction"
                      type="number"
                      min="0"
                      max="10"
                      step="0.1"
                      value={formData.customerSatisfaction}
                      onChange={(e) => handleInputChange("customerSatisfaction", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      /10
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="returnRate">Tingkat Pengembalian</Label>
                  <div className="relative">
                    <Input
                      id="returnRate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={formData.returnRate}
                      onChange={(e) => handleInputChange("returnRate", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <DollarSign className="h-5 w-5" />
                Metrik Finansial
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="monthlyRevenue">Pendapatan Bulanan</Label>
                  <div className="relative">
                    <Input
                      id="monthlyRevenue"
                      type="number"
                      min="0"
                      step="1000000"
                      value={formData.monthlyRevenue}
                      onChange={(e) => handleInputChange("monthlyRevenue", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      IDR
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productionCost">Biaya Produksi</Label>
                  <div className="relative">
                    <Input
                      id="productionCost"
                      type="number"
                      min="0"
                      step="1000000"
                      value={formData.productionCost}
                      onChange={(e) => handleInputChange("productionCost", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      IDR
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profitMargin">Margin Keuntungan</Label>
                  <div className="relative">
                    <Input
                      id="profitMargin"
                      type="number"
                      min="-100"
                      max="100"
                      step="0.1"
                      value={formData.profitMargin}
                      onChange={(e) => handleInputChange("profitMargin", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">%</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="operationalCost">Biaya Operasional</Label>
                  <div className="relative">
                    <Input
                      id="operationalCost"
                      type="number"
                      min="0"
                      step="1000000"
                      value={formData.operationalCost}
                      onChange={(e) => handleInputChange("operationalCost", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      IDR
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Operational Metrics */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Settings className="h-5 w-5" />
                Metrik Operasional
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Jumlah Karyawan</Label>
                  <Input
                    id="employeeCount"
                    type="number"
                    min="1"
                    value={formData.employeeCount}
                    onChange={(e) => handleInputChange("employeeCount", e.target.value)}
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="machineHours">Jam Operasi Mesin</Label>
                  <div className="relative">
                    <Input
                      id="machineHours"
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData.machineHours}
                      onChange={(e) => handleInputChange("machineHours", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      jam/hari
                    </span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="downtimeHours">Waktu Henti</Label>
                  <div className="relative">
                    <Input
                      id="downtimeHours"
                      type="number"
                      min="0"
                      step="0.1"
                      value={formData.downtimeHours}
                      onChange={(e) => handleInputChange("downtimeHours", e.target.value)}
                      placeholder="0"
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-500">
                      jam/bulan
                    </span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maintenanceFreq">Frekuensi Maintenance</Label>
                  <Select
                    value={formData.maintenanceFreq}
                    onValueChange={(value) => handleInputChange("maintenanceFreq", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih frekuensi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Harian</SelectItem>
                      <SelectItem value="weekly">Mingguan</SelectItem>
                      <SelectItem value="monthly">Bulanan</SelectItem>
                      <SelectItem value="quarterly">Triwulan</SelectItem>
                      <SelectItem value="annually">Tahunan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* External Factors */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">
                <Globe className="h-5 w-5" />
                Faktor Eksternal
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="marketDemand">Permintaan Pasar</Label>
                  <Select
                    value={formData.marketDemand}
                    onValueChange={(value) => handleInputChange("marketDemand", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat permintaan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_low">Sangat Rendah</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="moderate">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="very_high">Sangat Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="competitionLevel">Tingkat Kompetisi</Label>
                  <Select
                    value={formData.competitionLevel}
                    onValueChange={(value) => handleInputChange("competitionLevel", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih tingkat kompetisi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="very_low">Sangat Rendah</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="moderate">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="very_high">Sangat Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="economicCondition">Kondisi Ekonomi</Label>
                  <Select
                    value={formData.economicCondition}
                    onValueChange={(value) => handleInputChange("economicCondition", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih kondisi ekonomi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recession">Resesi</SelectItem>
                      <SelectItem value="slow_growth">Pertumbuhan Lambat</SelectItem>
                      <SelectItem value="stable">Stabil</SelectItem>
                      <SelectItem value="growth">Pertumbuhan</SelectItem>
                      <SelectItem value="boom">Boom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seasonality">Faktor Musiman</Label>
                  <Select
                    value={formData.seasonality}
                    onValueChange={(value) => handleInputChange("seasonality", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih pengaruh musiman" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Tidak Ada</SelectItem>
                      <SelectItem value="low">Rendah</SelectItem>
                      <SelectItem value="moderate">Sedang</SelectItem>
                      <SelectItem value="high">Tinggi</SelectItem>
                      <SelectItem value="very_high">Sangat Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-slate-800">📝 Catatan Tambahan</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="additionalNotes">Informasi Tambahan</Label>
                <Textarea
                  id="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={(e) => handleInputChange("additionalNotes", e.target.value)}
                  placeholder="Masukkan informasi tambahan yang mungkin mempengaruhi performa manufaktur..."
                  rows={4}
                />
                <p className="text-sm text-gray-600">
                  Opsional: Jelaskan kondisi khusus, tantangan, atau faktor lain yang relevan
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  type="submit"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
                >
                  🔮 Prediksi Performa
                </Button>
                <Button type="button" variant="outline" size="lg" onClick={resetForm}>
                  🔄 Reset Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Prediction Result */}
        {predictionResult && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <div className={`bg-gradient-to-r ${predictionResult.color} text-white p-6 rounded-lg text-center`}>
                <h3 className="text-2xl font-bold mb-4">📈 Hasil Prediksi Performa</h3>
                <div className="text-4xl font-bold mb-4">{predictionResult.score}/100</div>
                <p className="text-xl mb-4">{predictionResult.category}</p>
                <p className="text-lg">{predictionResult.recommendations}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Help Modal */}
        {showHelp && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-4xl max-h-[90vh] overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-slate-800 to-slate-700 text-white">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-xl">📋 Panduan Pengisian Form</CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowHelp(false)}
                    className="text-white hover:bg-white/20"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6 overflow-y-auto max-h-[70vh]">
                <HelpContent />
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}

function HelpContent() {
  return (
    <div className="space-y-6">
      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          🚀 Panduan Cepat - 5 Langkah Mudah
        </h3>
        <div className="space-y-4">
          {[
            {
              step: 1,
              title: "Siapkan Data Perusahaan",
              desc: "Kumpulkan informasi dasar seperti nama perusahaan, jenis industri, dan ukuran perusahaan",
            },
            {
              step: 2,
              title: "Hitung Metrik Produksi",
              desc: "Siapkan data output bulanan, kapasitas produksi, dan tingkat efisiensi",
            },
            {
              step: 3,
              title: "Evaluasi Kualitas",
              desc: "Masukkan data tingkat cacat, kepuasan pelanggan, dan tingkat pengembalian",
            },
            {
              step: 4,
              title: "Analisis Finansial",
              desc: "Input pendapatan, biaya produksi, dan margin keuntungan",
            },
            {
              step: 5,
              title: "Klik Prediksi",
              desc: "Tekan tombol 'Prediksi Performa' dan lihat hasil analisis",
            },
          ].map((item) => (
            <div key={item.step} className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm">
              <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {item.step}
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Field Explanations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <Factory className="h-5 w-5" />
            Informasi Perusahaan
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800">🏢 Nama Perusahaan *</h4>
              <p className="text-sm text-slate-600">Masukkan nama lengkap perusahaan manufaktur Anda.</p>
              <div className="mt-2 p-2 bg-green-100 rounded text-xs font-mono">
                Contoh: PT Industri Manufaktur Indonesia
              </div>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800">🏭 Jenis Industri *</h4>
              <p className="text-sm text-slate-600">Pilih kategori yang paling sesuai dengan bisnis Anda.</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Metrik Produksi
          </h3>
          <div className="space-y-3">
            <div className="p-3 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h4 className="font-semibold text-slate-800">📦 Output Bulanan *</h4>
              <p className="text-sm text-slate-600">Jumlah produk yang berhasil diproduksi dalam satu bulan.</p>
              <div className="mt-2 p-2 bg-green-100 rounded text-xs font-mono">Contoh: 5000 unit/bulan</div>
            </div>
            <div className="p-3 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
              <h4 className="font-semibold text-slate-800">📊 Utilisasi Kapasitas (Otomatis)</h4>
              <p className="text-sm text-slate-600">Dihitung otomatis: (Output ÷ Kapasitas) × 100%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">💡 Tips Penting</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">🎯 Akurasi Data</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Gunakan data aktual dari sistem ERP</li>
              <li>• Ambil rata-rata 3-6 bulan</li>
              <li>• Pastikan konsistensi satuan</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-800 mb-2">⚠️ Hindari Kesalahan</h4>
            <ul className="text-sm text-slate-600 space-y-1">
              <li>• Jangan campur data periode berbeda</li>
              <li>• Verifikasi perhitungan manual</li>
              <li>• Isi field wajib terlebih dahulu</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-slate-50 p-6 rounded-lg">
        <h3 className="text-lg font-bold text-slate-800 mb-4">📋 Checklist Sebelum Submit</h3>
        <div className="space-y-2">
          {[
            "Semua field wajib sudah terisi",
            "Data finansial sudah diverifikasi",
            "Perhitungan persentase sudah benar",
            "Satuan dan periode waktu konsisten",
            "Data eksternal sudah disesuaikan dengan kondisi terkini",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-2 bg-white rounded">
              <CheckCircle2 className="h-4 w-4 text-green-600" />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
