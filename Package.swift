// swift-tools-version: 5.6
// The swift-tools-version declares the minimum version of Swift required to build this package.
import PackageDescription

let package = Package(
    name: "CompoundDesignTokens",
    platforms: [.iOS(.v14)],
    products: [
        .library(name: "CompoundDesignTokens", targets: ["CompoundDesignTokens"])
    ],
    targets: [
        .target(name: "CompoundDesignTokens",
                path: "assets/ios/swift",
                resources: [.copy("Resources/theme.iife.js")])
    ]
)
