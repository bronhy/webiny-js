/**
 * Rename file to types.ts when switching the package to Typescript.
 */
import {Plugin} from "@webiny/plugins/types";
import {ContextInterface} from "@webiny/handler/types";

interface Project {
    /**
     * Name of the project.
     */
    name: string;
    /**
     * Configurations.
     */
    config: Record<string, any>;
    /**
     * Root path of the project.
     */
    root: string;
}

/**
 * A type that represents the logging method.
 */
interface Log {
    (...args): string;
    hl: (...args) => string;
    highlight: (...args) => string;
}

/**
 * Interface representing the CLI Context.
 */
export interface CliContext extends ContextInterface {
    /**
     * All the environment variables.
     */
    loadedEnvFiles: Record<string, any>;
    /**
     * Version of the Webiny CLI.
     */
    version: string;
    /**
     * Project information.
     */
    project: Project;
    /**
     * Trigger given callback on SIGINT.
     */
    onExit: (cb: () => any) => void;
    /**
     * Import a given module.
     */
    import: (module: string) => Promise<void>;
    /**
     * Regular logging.
     */
    log: Log;
    /**
     * Info logging.
     */
    info: Log;
    /**
     * Success logging.
     */
    success: Log;
    /**
     * Debug logging.
     */
    debug: Log;
    /**
     * Warnings logging.
     */
    warning: Log;
    /**
     * Errors logging.
     */
    error: Log;
}

/**
 * Args received from the CLI.
 */
interface CliUpgradePluginOptions {
    /**
     * Targeted version of the upgrade.
     */
    targetVersion: string;
}
/**
 *
 */
export interface CliUpgradePlugin extends Plugin {
    /**
     * Name of the plugin to differentiate from others.
     * Something like: cli-upgrade-5.0.0
     */
    name: string;
    /**
     * Type of the plugin.
     */
    type: "cli-upgrade";
    /**
     * Version the plugin is for.
     */
    version: string;
    /**
     * Is this plugin usable for the upgrade?
     */
    canUpgrade?: (options: CliUpgradePluginOptions, context: CliContext) => Promise<boolean>;
    /**
     * Apply the upgrade.
     */
    upgrade: (options: CliUpgradePluginOptions, context: CliContext) => Promise<void>;
}