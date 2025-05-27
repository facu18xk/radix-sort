"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Pause, RotateCcw, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export default function RadixSortPresentation() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [array, setArray] = useState([170, 45, 75, 90, 2, 802, 24, 66])
  const [buckets, setBuckets] = useState<number[][]>(
    Array(10)
      .fill(null)
      .map(() => []),
  )
  const [currentDigit, setCurrentDigit] = useState(0)
  const [sortedArray, setSortedArray] = useState<number[]>([])

  const maxDigits = Math.max(...array).toString().length

  const getDigit = (num: number, position: number) => {
    return Math.floor(num / Math.pow(10, position)) % 10
  }

  const radixSortStep = () => {
    if (currentDigit >= maxDigits) {
      setIsPlaying(false)
      return
    }

    // Clear buckets
    const newBuckets: number[][] = Array(10)
      .fill(null)
      .map(() => [])

    // Distribute numbers into buckets based on current digit
    const currentArray = currentDigit === 0 ? array : sortedArray
    currentArray.forEach((num) => {
      const digit = getDigit(num, currentDigit)
      newBuckets[digit].push(num)
    })

    setBuckets(newBuckets)

    // Collect numbers from buckets after showing the distribution
    setTimeout(() => {
      const newSorted = newBuckets.flat()
      setSortedArray(newSorted)
      setCurrentDigit((prev) => prev + 1)
    }, 5000) // Increased to 5 seconds to allow time to see the process
  }

  useEffect(() => {
    if (isPlaying && currentDigit < maxDigits) {
      const timer = setTimeout(radixSortStep, 6000) // 6 seconds between iterations
      return () => clearTimeout(timer)
    } else if (currentDigit >= maxDigits) {
      setIsPlaying(false)
    }
  }, [isPlaying, currentDigit])

  const resetSimulation = () => {
    setCurrentDigit(0)
    setSortedArray([])
    setBuckets(
      Array(10)
        .fill(null)
        .map(() => []),
    )
    setIsPlaying(false)
  }

  const togglePlay = () => {
    if (currentDigit >= maxDigits) {
      resetSimulation()
    }
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),transparent_50%)]" />

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-6xl md:text-8xl font-thin text-white mb-6 tracking-tight">
              Radix
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-light">
                Sort
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 font-light">
              Ordenamiento no comparativo. Dígito por dígito.
            </p>
            <Badge variant="secondary" className="text-sm px-4 py-2 bg-white/10 text-white border-white/20">
              O(n·k) Complejidad Temporal
            </Badge>
          </motion.div>
        </div>
      </section>

      {/* What is Radix Sort */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">¿Qué es Radix Sort?</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                Radix Sort es un algoritmo de ordenamiento no comparativo que organiza los datos procesando dígito por
                dígito, desde el menos significativo al más significativo.
              </p>
              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">No Comparativo</h3>
                    <p className="text-gray-400 text-sm">No compara elementos directamente</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Estable</h3>
                    <p className="text-gray-400 text-sm">Mantiene el orden relativo</p>
                  </CardContent>
                </Card>
                <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-red-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">Dígito a Dígito</h3>
                    <p className="text-gray-400 text-sm">Procesa cada posición decimal</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Historical Development */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">Desarrollo Histórico</h2>
            <div className="relative">
              <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-blue-500 to-purple-500"></div>
              <div className="space-y-12">
                <div className="flex items-center">
                  <div className="flex-1 text-right pr-8">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">1890</h3>
                      <p className="text-gray-300">
                        Herman Hollerith utiliza el concepto en máquinas perforadoras para el censo de EE.UU.
                      </p>
                    </Card>
                  </div>
                  <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative z-10"></div>
                  <div className="flex-1 pl-8"></div>
                </div>
                <div className="flex items-center">
                  <div className="flex-1 pr-8"></div>
                  <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full relative z-10"></div>
                  <div className="flex-1 text-left pl-8">
                    <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-6">
                      <h3 className="text-xl font-semibold text-white mb-2">Siglo XX</h3>
                      <p className="text-gray-300">
                        Con el crecimiento de la informática, se optimiza para sistemas que procesan grandes volúmenes
                        de datos numéricos.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Advantages and Disadvantages */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-800/30 to-pink-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">Ventajas y Desventajas</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-green-500/10 border-green-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-green-400 mb-6">Ventajas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Complejidad lineal en muchos casos prácticos</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">No usa comparaciones: eficiente en situaciones específicas</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Es un algoritmo estable</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="bg-red-500/10 border-red-500/20 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-red-400 mb-6">Desventajas</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Requiere espacio adicional (memoria auxiliar)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">No funciona bien con claves muy largas o variables</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300">Menos versátil que otros algoritmos</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Applications */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">Aplicaciones Comunes</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: "Bases de Datos",
                  description: "Ordenamiento de registros con claves numéricas",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  title: "Motores de Búsqueda",
                  description: "Procesamiento de grandes volúmenes de datos",
                  gradient: "from-purple-500 to-pink-500",
                },
                {
                  title: "Sistemas Embebidos",
                  description: "Aplicaciones en procesamiento de señales",
                  gradient: "from-green-500 to-emerald-500",
                },
                {
                  title: "Análisis de Datos",
                  description: "Ordenamiento estable requerido",
                  gradient: "from-orange-500 to-red-500",
                },
              ].map((app, index) => (
                <Card
                  key={index}
                  className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${app.gradient} rounded-full mx-auto mb-4 flex items-center justify-center`}
                    >
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    <h3 className="text-white font-semibold mb-2">{app.title}</h3>
                    <p className="text-gray-400 text-sm">{app.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Complexity */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-blue-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">Análisis de Complejidad</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-blue-400 mb-6">Complejidad Temporal</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Mejor caso:</span>
                      <Badge className="bg-green-500/20 text-green-400">O(n·k)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Caso promedio:</span>
                      <Badge className="bg-blue-500/20 text-blue-400">O(n·k)</Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Peor caso:</span>
                      <Badge className="bg-red-500/20 text-red-400">O(n·k)</Badge>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Donde n es el número de elementos y k es la longitud de la clave
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-purple-400 mb-6">Complejidad Espacial</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-300">Espacio auxiliar:</span>
                      <Badge className="bg-purple-500/20 text-purple-400">O(n + k)</Badge>
                    </div>
                  </div>
                  <p className="text-gray-400 text-sm mt-4">
                    Necesita estructuras auxiliares para contar frecuencias y reconstruir el arreglo
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">
              Comparación con Otros Algoritmos
            </h2>
            <Card className="bg-white/5 border-white/10 backdrop-blur-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left p-4 text-white font-semibold">Algoritmo</th>
                      <th className="text-center p-4 text-white font-semibold">Comparativo</th>
                      <th className="text-center p-4 text-white font-semibold">Estable</th>
                      <th className="text-center p-4 text-white font-semibold">Complejidad</th>
                      <th className="text-left p-4 text-white font-semibold">Uso Típico</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "Radix Sort",
                        comparative: "❌",
                        stable: "✅",
                        complexity: "O(n·k)",
                        use: "Datos numéricos",
                      },
                      {
                        name: "Merge Sort",
                        comparative: "✅",
                        stable: "✅",
                        complexity: "O(n log n)",
                        use: "Ordenamiento general",
                      },
                      {
                        name: "Quick Sort",
                        comparative: "✅",
                        stable: "❌",
                        complexity: "O(n log n)",
                        use: "Rápido y general",
                      },
                      {
                        name: "Counting Sort",
                        comparative: "❌",
                        stable: "✅",
                        complexity: "O(n + k)",
                        use: "Rangos pequeños",
                      },
                    ].map((row, index) => (
                      <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                        <td className="p-4 text-white font-medium">{row.name}</td>
                        <td className="p-4 text-center text-lg">{row.comparative}</td>
                        <td className="p-4 text-center text-lg">{row.stable}</td>
                        <td className="p-4 text-center">
                          <Badge variant="outline" className="border-white/20 text-white">
                            {row.complexity}
                          </Badge>
                        </td>
                        <td className="p-4 text-gray-300">{row.use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Where Radix Sort Shines */}
      <section className="py-20 px-4 bg-gradient-to-r from-purple-800/30 to-pink-800/30">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-12 text-center">¿Dónde Brilla Radix Sort?</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Ideal Cuando:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Se ordenan grandes cantidades de datos numéricos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Se requiere ordenamiento estable</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-pink-400 to-red-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Las claves son de tamaño fijo y cortas</span>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-white mb-6">Usos Comunes:</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Motores de bases de datos</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Procesamiento de archivos de logs</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-gray-300">Aplicaciones científicas y de análisis</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Visual Simulation */}
      <section className="py-20 px-4 bg-gradient-to-r from-slate-800/50 to-purple-800/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-thin text-white mb-6">Simulación Visual</h2>
            <p className="text-lg text-gray-300 mb-8">
              Observa cómo Radix Sort ordena paso a paso usando LSD (Least Significant Digit)
            </p>
          </motion.div>

          <Card className="bg-white/5 border-white/10 backdrop-blur-sm p-8">
            <div className="mb-6 flex justify-center gap-4">
              <Button
                onClick={togglePlay}
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
              >
                {isPlaying ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
                {isPlaying ? "Pausar" : "Reproducir"}
              </Button>
              <Button
                onClick={resetSimulation}
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reiniciar
              </Button>
            </div>

            <div className="text-center mb-8">
              <Badge variant="secondary" className="bg-white/10 text-white text-lg px-6 py-2">
                Iteración {currentDigit + 1}: Procesando dígito de las{" "}
                {currentDigit === 0 ? "Unidades" : currentDigit === 1 ? "Decenas" : "Centenas"}
              </Badge>
            </div>

            {/* Current Array for this iteration */}
            <div className="mb-8">
              <h3 className="text-white text-xl mb-4 text-center">
                {currentDigit === 0 ? "Array Original:" : `Array después de ${currentDigit} iteración(es):`}
              </h3>
              <div className="flex justify-center gap-3 flex-wrap mb-4">
                {(currentDigit === 0 ? array : sortedArray).map((num, index) => {
                  const digitToHighlight = getDigit(num, currentDigit)
                  const numStr = num.toString().padStart(3, "0")

                  return (
                    <motion.div
                      key={`current-${index}-${currentDigit}`}
                      className="relative"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-20 h-20 bg-gradient-to-r from-gray-600 to-gray-700 rounded-lg flex flex-col items-center justify-center text-white font-bold border-2 border-gray-500">
                        <div className="text-lg">{num}</div>
                        <div className="text-xs text-gray-300 mt-1">
                          {numStr.split("").map((digit, digitIndex) => (
                            <span
                              key={digitIndex}
                              className={
                                digitIndex === 2 - currentDigit
                                  ? "text-yellow-400 font-bold bg-yellow-400/20 px-1 rounded"
                                  : ""
                              }
                            >
                              {digit}
                            </span>
                          ))}
                        </div>
                      </div>
                      {/* Arrow pointing to bucket */}
                      {buckets.some((bucket) => bucket.length > 0) && (
                        <motion.div
                          className="absolute -bottom-8 left-1/2 transform -translate-x-1/2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 1 + index * 0.2 }}
                        >
                          <div className="text-yellow-400 text-sm font-bold">→ {digitToHighlight}</div>
                        </motion.div>
                      )}
                    </motion.div>
                  )
                })}
              </div>
              <div className="text-center text-gray-400 text-sm">
                El dígito resaltado en amarillo es el que se usa para esta iteración
              </div>
            </div>

            {/* Arrow indicating distribution */}
            {buckets.some((bucket) => bucket.length > 0) && (
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <div className="text-white text-lg mb-2">↓</div>
                <div className="text-gray-300">Distribuyendo en buckets según el dígito...</div>
              </motion.div>
            )}

            {/* Buckets */}
            {buckets.some((bucket) => bucket.length > 0) && (
              <div className="mb-8">
                <h3 className="text-white text-xl mb-6 text-center">Buckets (0-9):</h3>
                <div className="grid grid-cols-5 md:grid-cols-10 gap-3">
                  {buckets.map((bucket, bucketIndex) => (
                    <div key={bucketIndex} className="text-center">
                      <div className="text-white text-lg mb-2 font-bold">{bucketIndex}</div>
                      <div className="min-h-24 bg-white/5 border-2 border-white/20 rounded-lg p-2 flex flex-col gap-2">
                        <AnimatePresence>
                          {bucket.map((num, numIndex) => (
                            <motion.div
                              key={`bucket-${bucketIndex}-${num}-${numIndex}-${currentDigit}`}
                              className="w-full h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded text-white text-sm flex items-center justify-center font-bold shadow-lg"
                              initial={{ opacity: 0, y: -30, scale: 0.8 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: 30, scale: 0.8 }}
                              transition={{
                                delay: 2 + numIndex * 0.3,
                                duration: 0.5,
                                type: "spring",
                                stiffness: 100,
                              }}
                            >
                              {num}
                            </motion.div>
                          ))}
                        </AnimatePresence>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Arrow indicating collection */}
            {sortedArray.length > 0 && buckets.some((bucket) => bucket.length > 0) && (
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 4 }}
              >
                <div className="text-white text-lg mb-2">↓</div>
                <div className="text-gray-300">Recolectando de los buckets en orden...</div>
              </motion.div>
            )}

            {/* Sorted Array */}
            {sortedArray.length > 0 && (
              <div className="mb-6">
                <h3 className="text-white text-xl mb-4 text-center">
                  {currentDigit >= maxDigits ? "🎉 Array Final Ordenado:" : "Resultado de esta iteración:"}
                </h3>
                <div className="flex justify-center gap-3 flex-wrap">
                  {sortedArray.map((num, index) => (
                    <motion.div
                      key={`sorted-${index}-${currentDigit}`}
                      className={`w-20 h-20 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg ${
                        currentDigit >= maxDigits
                          ? "bg-gradient-to-r from-green-500 to-emerald-500 border-2 border-green-400"
                          : "bg-gradient-to-r from-purple-500 to-pink-500 border-2 border-purple-400"
                      }`}
                      initial={{ scale: 0, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      transition={{
                        delay: 4.5 + index * 0.15,
                        duration: 0.4,
                        type: "spring",
                        stiffness: 120,
                      }}
                    >
                      {num}
                    </motion.div>
                  ))}
                </div>
                {currentDigit >= maxDigits && (
                  <motion.div
                    className="text-center mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 5.5 }}
                  >
                    <Badge className="bg-green-500/20 text-green-400 text-lg px-4 py-2">
                      ¡Ordenamiento Completado!
                    </Badge>
                  </motion.div>
                )}
              </div>
            )}

            {/* Progress indicator */}
            <div className="mt-8 text-center">
              <div className="flex justify-center gap-2 mb-2">
                {Array.from({ length: maxDigits }, (_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full ${
                      i < currentDigit ? "bg-green-500" : i === currentDigit ? "bg-blue-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <div className="text-gray-400 text-sm">
                Progreso: {currentDigit} de {maxDigits} iteraciones completadas
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-gray-400">Radix Sort: Eficiencia en el ordenamiento de datos estructurados</p>
        </div>
      </footer>
    </div>
  )
}
