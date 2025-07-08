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
            <p className="text-lg opacity-90 mb-2">
              Sistem Prediksi Berbasis Machine Learning untuk Analisis Performa Manufaktur
            </p>
            <div className="text-sm opacity-80 mb-4">
              <p className="font-semibold mb-2">Oleh Kelompok 3 Kelas D:</p>
              <div className="space-y-1">
                <p>1. Rofi Barbie Silviana Putri</p>
                <p>2. Olivia Glorya Velty Solossa</p>
                <p>3. Putriani Sari Rejeki Jae</p>
              </div>
            </div>
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
    <div className="space-y-8">
      {/* Quick Start Guide */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200">
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
            <div
              key={item.step}
              className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                {item.step}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">{item.title}</h4>
                <p className="text-slate-600 text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Company Information Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-blue-300 pb-2">
          <Factory className="h-5 w-5 text-blue-600" />📊 Informasi Perusahaan
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              🏢 Nama Perusahaan{" "}
              <Badge variant="destructive" className="text-xs">
                WAJIB
              </Badge>
            </h4>
            <p className="text-slate-600 mb-3">Masukkan nama lengkap perusahaan manufaktur Anda.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-green-800">
                PT Industri Manufaktur Indonesia
                <br />
                CV Karya Mandiri Sejahtera
                <br />
                UD Maju Bersama
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              🏭 Jenis Industri{" "}
              <Badge variant="destructive" className="text-xs">
                WAJIB
              </Badge>
            </h4>
            <p className="text-slate-600 mb-3">Pilih kategori industri yang paling sesuai dengan bisnis Anda.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Pilihan yang tersedia:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Otomotif:</strong> Mobil, motor, suku cadang
                </li>
                <li>
                  • <strong>Elektronik:</strong> Komputer, smartphone, peralatan elektronik
                </li>
                <li>
                  • <strong>Tekstil:</strong> Pakaian, kain, produk tekstil
                </li>
                <li>
                  • <strong>Makanan & Minuman:</strong> Pengolahan makanan, minuman
                </li>
                <li>
                  • <strong>Kimia:</strong> Bahan kimia, farmasi, kosmetik
                </li>
                <li>
                  • <strong>Mesin & Peralatan:</strong> Mesin industri, alat berat
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">👥 Ukuran Perusahaan</h4>
            <p className="text-slate-600 mb-3">Klasifikasi berdasarkan jumlah karyawan.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Kategori:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Kecil:</strong> Kurang dari 50 karyawan
                </li>
                <li>
                  • <strong>Menengah:</strong> 50-250 karyawan
                </li>
                <li>
                  • <strong>Besar:</strong> Lebih dari 250 karyawan
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">📅 Tahun Beroperasi</h4>
            <p className="text-slate-600 mb-3">Berapa lama perusahaan telah beroperasi (dalam tahun).</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-green-800">
                Jika perusahaan didirikan tahun 2015, maka di tahun 2024 = 9 tahun
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Production Metrics Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-blue-300 pb-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />🏭 Metrik Produksi
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              📦 Output Bulanan{" "}
              <Badge variant="destructive" className="text-xs">
                WAJIB
              </Badge>
            </h4>
            <p className="text-slate-600 mb-3">Jumlah produk yang berhasil diproduksi dalam satu bulan (dalam unit).</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-green-800">
                • Pabrik sepatu: 5000 pasang/bulan
                <br />• Pabrik elektronik: 1200 unit/bulan
                <br />• Pabrik makanan: 50000 kemasan/bulan
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
              🎯 Kapasitas Produksi{" "}
              <Badge variant="destructive" className="text-xs">
                WAJIB
              </Badge>
            </h4>
            <p className="text-slate-600 mb-3">
              Maksimum produk yang dapat diproduksi dalam satu bulan jika beroperasi penuh.
            </p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Cara menghitung:</div>
              <div className="font-mono text-sm text-green-800">
                Kapasitas mesin × Jam operasi × Hari kerja
                <br />
                Contoh: 100 unit/jam × 8 jam × 25 hari = 20.000 unit/bulan
              </div>
            </div>
          </div>

          <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
            <h4 className="font-bold text-slate-800 mb-2">📊 Utilisasi Kapasitas (Otomatis)</h4>
            <div className="bg-yellow-50 p-3 rounded border-l-3 border-yellow-500 mb-3">
              <div className="font-mono text-sm text-yellow-800">
                Utilisasi = (Output Bulanan ÷ Kapasitas Produksi) × 100%
              </div>
            </div>
            <p className="text-slate-600">
              Field ini akan terisi otomatis saat Anda mengisi Output Bulanan dan Kapasitas Produksi.
            </p>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">⚡ Efisiensi Produksi</h4>
            <p className="text-slate-600 mb-3">Persentase efektivitas proses produksi dibandingkan standar ideal.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Cara menghitung:</div>
              <div className="font-mono text-sm text-green-800">
                (Waktu Standar ÷ Waktu Aktual) × 100%
                <br />
                Contoh: Standar 60 menit, aktual 75 menit = 80% efisiensi
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">💡 Tips Mengisi Metrik Produksi</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Gunakan data rata-rata 3-6 bulan terakhir untuk akurasi yang lebih baik</li>
            <li>• Pastikan satuan unit konsisten (pieces, kg, liter, dll)</li>
            <li>• Jika produk beragam, konversi ke unit standar atau gunakan nilai produksi</li>
            <li>• Utilisasi kapasitas yang baik umumnya 70-85%</li>
          </ul>
        </div>
      </div>

      {/* Quality Metrics Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-blue-300 pb-2">
          <CheckCircle2 className="h-5 w-5 text-blue-600" />✅ Metrik Kualitas
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">❌ Tingkat Cacat</h4>
            <p className="text-slate-600 mb-3">Persentase produk cacat dari total produksi.</p>
            <div className="bg-yellow-50 p-3 rounded border-l-3 border-yellow-500 mb-2">
              <div className="font-mono text-sm text-yellow-800">(Jumlah Produk Cacat ÷ Total Produksi) × 100%</div>
            </div>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-green-800">50 cacat dari 10.000 produk = 0.5%</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">🔄 Tingkat Pengerjaan Ulang</h4>
            <p className="text-slate-600 mb-3">Persentase produk yang perlu dikerjakan ulang untuk memenuhi standar.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-green-800">Dari 1000 produk, 30 perlu rework = 3%</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">😊 Kepuasan Pelanggan</h4>
            <p className="text-slate-600 mb-3">Rating kepuasan pelanggan dalam skala 1-10.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Sumber data:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Survey kepuasan pelanggan</li>
                <li>• Review online</li>
                <li>• Feedback langsung</li>
                <li>• Rating aplikasi/website</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">↩️ Tingkat Pengembalian</h4>
            <p className="text-slate-600 mb-3">Persentase produk yang dikembalikan oleh pelanggan.</p>
            <div className="bg-yellow-50 p-3 rounded border-l-3 border-yellow-500">
              <div className="text-sm font-semibold text-yellow-700 mb-1">Rumus:</div>
              <div className="font-mono text-sm text-yellow-800">(Produk Dikembalikan ÷ Total Penjualan) × 100%</div>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-red-50 p-4 rounded-lg border border-red-200">
          <h4 className="font-bold text-red-800 mb-2 flex items-center gap-2">⚠️ Standar Industri</h4>
          <div className="text-sm text-red-800 space-y-1">
            <p>
              <strong>Tingkat Cacat:</strong> &lt; 1% (sangat baik), 1-3% (baik), &gt; 5% (perlu perbaikan)
            </p>
            <p>
              <strong>Kepuasan Pelanggan:</strong> &gt; 8.0 (excellent), 7.0-8.0 (good), &lt; 7.0 (needs improvement)
            </p>
          </div>
        </div>
      </div>

      {/* Financial Metrics Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-blue-300 pb-2">
          <DollarSign className="h-5 w-5 text-blue-600" />💰 Metrik Finansial
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">💵 Pendapatan Bulanan</h4>
            <p className="text-slate-600 mb-3">
              Total pendapatan kotor dari penjualan produk dalam satu bulan (dalam Rupiah).
            </p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-green-800">Penjualan 1000 unit × Rp 500.000 = Rp 500.000.000</div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">🏭 Biaya Produksi</h4>
            <p className="text-slate-600 mb-3">
              Total biaya untuk memproduksi barang (bahan baku, tenaga kerja langsung, overhead pabrik).
            </p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Komponen biaya:</div>
              <div className="font-mono text-sm text-green-800">
                • Bahan baku: Rp 200.000.000
                <br />• Tenaga kerja: Rp 100.000.000
                <br />• Overhead pabrik: Rp 50.000.000
                <br />
                <strong>Total: Rp 350.000.000</strong>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">📈 Margin Keuntungan</h4>
            <p className="text-slate-600 mb-3">Persentase keuntungan dari pendapatan.</p>
            <div className="bg-yellow-50 p-4 rounded border-l-3 border-yellow-500 mb-3">
              <div className="font-mono text-sm text-yellow-800 mb-2">
                Margin = ((Pendapatan - Total Biaya) ÷ Pendapatan) × 100%
              </div>
              <div className="text-sm font-semibold text-yellow-700 mb-1">Contoh:</div>
              <div className="font-mono text-sm text-yellow-800">
                Pendapatan: Rp 500 juta, Biaya: Rp 400 juta
                <br />
                Margin = ((500-400) ÷ 500) × 100% = 20%
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">⚙️ Biaya Operasional</h4>
            <p className="text-slate-600 mb-3">
              Biaya untuk menjalankan operasi sehari-hari (listrik, maintenance, administrasi).
            </p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Termasuk:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Listrik dan utilitas</li>
                <li>• Maintenance mesin</li>
                <li>• Gaji staff administrasi</li>
                <li>• Biaya logistik</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">💡 Tips Finansial</h4>
          <ul className="text-sm text-yellow-800 space-y-1">
            <li>• Gunakan data dari laporan keuangan bulanan</li>
            <li>• Pastikan semua biaya sudah termasuk (jangan ada yang terlewat)</li>
            <li>• Margin keuntungan industri manufaktur umumnya 10-25%</li>
            <li>• Bandingkan dengan periode sebelumnya untuk melihat tren</li>
          </ul>
        </div>
      </div>

      {/* Operational Metrics Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-blue-300 pb-2">
          <Settings className="h-5 w-5 text-blue-600" />
          ⚙️ Metrik Operasional
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">👥 Jumlah Karyawan</h4>
            <p className="text-slate-600 mb-3">Total karyawan yang terlibat dalam proses produksi.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Termasuk:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Operator mesin</li>
                <li>• Supervisor produksi</li>
                <li>• Quality control</li>
                <li>• Maintenance staff</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">🕐 Jam Operasi Mesin</h4>
            <p className="text-slate-600 mb-3">Rata-rata jam operasi mesin per hari.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Contoh:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>• Shift tunggal: 8 jam/hari</li>
                <li>• Shift ganda: 16 jam/hari</li>
                <li>• Operasi 24 jam: 24 jam/hari</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">⏸️ Waktu Henti (Downtime)</h4>
            <p className="text-slate-600 mb-3">Total waktu mesin tidak beroperasi dalam satu bulan (jam).</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Penyebab downtime:</div>
              <div className="font-mono text-sm text-green-800">
                • Maintenance terjadwal: 20 jam
                <br />• Kerusakan mesin: 15 jam
                <br />• Pergantian produk: 10 jam
                <br />
                <strong>Total: 45 jam/bulan</strong>
              </div>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">🔧 Frekuensi Maintenance</h4>
            <p className="text-slate-600 mb-3">Seberapa sering maintenance rutin dilakukan.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Rekomendasi:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Harian:</strong> Mesin kritis/presisi tinggi
                </li>
                <li>
                  • <strong>Mingguan:</strong> Mesin produksi utama
                </li>
                <li>
                  • <strong>Bulanan:</strong> Mesin pendukung
                </li>
                <li>
                  • <strong>Triwulan:</strong> Peralatan non-kritis
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-4 bg-cyan-50 p-4 rounded-lg border border-cyan-200">
          <h4 className="font-bold text-cyan-800 mb-2">📊 OEE (Overall Equipment Effectiveness)</h4>
          <div className="bg-white p-3 rounded border-l-3 border-cyan-500 mb-2">
            <div className="font-mono text-sm text-cyan-800">
              OEE = Availability × Performance × Quality
              <br />
              Availability = (Jam Operasi - Downtime) ÷ Jam Operasi
            </div>
          </div>
          <p className="text-sm text-cyan-800">OEE yang baik umumnya &gt; 85%</p>
        </div>
      </div>

      {/* External Factors Section */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2 border-b border-blue-300 pb-2">
          <Globe className="h-5 w-5 text-blue-600" />🌍 Faktor Eksternal
        </h3>
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">📊 Permintaan Pasar</h4>
            <p className="text-slate-600 mb-3">Tingkat permintaan produk Anda di pasar saat ini.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Indikator:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Sangat Tinggi:</strong> Order melebihi kapasitas
                </li>
                <li>
                  • <strong>Tinggi:</strong> Order mendekati kapasitas
                </li>
                <li>
                  • <strong>Sedang:</strong> Order 60-80% kapasitas
                </li>
                <li>
                  • <strong>Rendah:</strong> Order &lt; 60% kapasitas
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">🏆 Tingkat Kompetisi</h4>
            <p className="text-slate-600 mb-3">Seberapa ketat persaingan di industri Anda.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Penilaian:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Sangat Tinggi:</strong> &gt; 10 kompetitor utama
                </li>
                <li>
                  • <strong>Tinggi:</strong> 5-10 kompetitor
                </li>
                <li>
                  • <strong>Sedang:</strong> 3-5 kompetitor
                </li>
                <li>
                  • <strong>Rendah:</strong> &lt; 3 kompetitor
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">📈 Kondisi Ekonomi</h4>
            <p className="text-slate-600 mb-3">Kondisi ekonomi makro yang mempengaruhi bisnis.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Indikator:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Boom:</strong> Pertumbuhan ekonomi &gt; 6%
                </li>
                <li>
                  • <strong>Pertumbuhan:</strong> 3-6%
                </li>
                <li>
                  • <strong>Stabil:</strong> 1-3%
                </li>
                <li>
                  • <strong>Lambat:</strong> 0-1%
                </li>
                <li>
                  • <strong>Resesi:</strong> Pertumbuhan negatif
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-white rounded-lg border-l-4 border-blue-500">
            <h4 className="font-bold text-slate-800 mb-2">🌤️ Faktor Musiman</h4>
            <p className="text-slate-600 mb-3">Seberapa besar pengaruh musim terhadap penjualan produk.</p>
            <div className="bg-green-50 p-3 rounded border-l-3 border-green-500">
              <div className="text-sm font-semibold text-green-700 mb-2">Contoh:</div>
              <ul className="text-sm text-green-800 space-y-1">
                <li>
                  • <strong>Sangat Tinggi:</strong> Produk lebaran, natal
                </li>
                <li>
                  • <strong>Tinggi:</strong> Pakaian, mainan
                </li>
                <li>
                  • <strong>Sedang:</strong> Makanan tertentu
                </li>
                <li>
                  • <strong>Rendah:</strong> Produk kebutuhan sehari-hari
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Tips & Important Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-yellow-50 p-6 rounded-lg border border-yellow-200">
          <h3 className="text-lg font-bold text-yellow-800 mb-4 flex items-center gap-2">🎯 Tips Akurasi Data</h3>
          <ul className="text-sm text-yellow-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Gunakan data aktual dari sistem ERP atau laporan resmi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Ambil rata-rata 3-6 bulan untuk menghindari fluktuasi</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Pastikan konsistensi satuan dan periode waktu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Verifikasi data dengan departemen terkait</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-yellow-600 mt-1">•</span>
              <span>Dokumentasikan sumber data untuk referensi</span>
            </li>
          </ul>
        </div>

        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">⚡ Tips Efisiensi</h3>
          <ul className="text-sm text-blue-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Siapkan semua data sebelum mulai mengisi form</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Isi field wajib (bertanda *) terlebih dahulu</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Gunakan fitur auto-calculation untuk field yang tersedia</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Simpan draft secara berkala jika form panjang</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>Gunakan template untuk pengisian rutin</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="bg-red-50 p-6 rounded-lg border border-red-200">
        <h3 className="text-lg font-bold text-red-800 mb-4 flex items-center gap-2">
          ⚠️ Kesalahan Umum yang Harus Dihindari
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ul className="text-sm text-red-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">❌</span>
              <span>Mencampur data dari periode yang berbeda</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">❌</span>
              <span>Menggunakan data perkiraan tanpa basis yang jelas</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">❌</span>
              <span>Mengabaikan field opsional yang relevan</span>
            </li>
          </ul>
          <ul className="text-sm text-red-800 space-y-2">
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">❌</span>
              <span>Tidak memverifikasi perhitungan manual</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">❌</span>
              <span>Mengisi data yang tidak konsisten antar field</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-600 mt-1">❌</span>
              <span>Mengabaikan faktor eksternal yang penting</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Final Checklist */}
      <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">📋 Checklist Sebelum Submit</h3>
        <div className="space-y-3">
          {[
            "Semua field wajib sudah terisi",
            "Data finansial sudah diverifikasi",
            "Perhitungan persentase sudah benar",
            "Satuan dan periode waktu konsisten",
            "Data eksternal sudah disesuaikan dengan kondisi terkini",
            "Catatan tambahan sudah diisi jika diperlukan",
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-100">
              <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-sm text-slate-700">{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Ready to Start */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 rounded-lg border border-green-200 text-center">
        <h3 className="text-xl font-bold text-slate-800 mb-3 flex items-center justify-center gap-2">🚀 Siap Mulai?</h3>
        <p className="text-slate-600 mb-4">
          Setelah membaca panduan ini, Anda sudah siap mengisi form prediksi performa manufaktur. Ingat, semakin akurat
          data yang Anda masukkan, semakin akurat pula hasil prediksi yang akan diperoleh.
        </p>
        <p className="text-lg font-semibold text-slate-800">
          <strong>Selamat menganalisis performa manufaktur Anda! 🎉</strong>
        </p>
      </div>
    </div>
  )
}
