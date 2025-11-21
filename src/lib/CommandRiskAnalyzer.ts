export interface RiskAnalysisResult {
  isHighRisk: boolean;
  reason?: string;
  riskLevel: 'low' | 'medium' | 'high';
}

export class CommandRiskAnalyzer {
  private highRiskPatterns = [
    { pattern: /rm\s+-rf\s+\//i, reason: 'Recursive deletion of root directory' },
    { pattern: /mkfs/i, reason: 'Filesystem formatting command' },
    { pattern: /dd\s+if=/i, reason: 'Direct disk write operation' },
    { pattern: /shutdown/i, reason: 'System shutdown command' },
    { pattern: /reboot/i, reason: 'System reboot command' },
    { pattern: /init\s+0/i, reason: 'System halt command' },
    { pattern: /kill\s+-9\s+1/i, reason: 'Killing init process' },
    { pattern: /:(){ :\|:& };:/i, reason: 'Fork bomb detected' },
    { pattern: />\s*\/dev\/sda/i, reason: 'Writing to raw disk device' },
    { pattern: /chmod\s+-R\s+777/i, reason: 'Dangerous permission changes' },
    { pattern: /chown\s+-R.*root/i, reason: 'Ownership change to root' },
  ];

  private mediumRiskPatterns = [
    { pattern: /rm\s+-r/i, reason: 'Recursive deletion' },
    { pattern: /sudo/i, reason: 'Elevated privileges' },
    { pattern: /systemctl\s+(stop|disable)/i, reason: 'Service management' },
    { pattern: /iptables/i, reason: 'Firewall configuration' },
    { pattern: /passwd/i, reason: 'Password modification' },
    { pattern: /useradd|userdel/i, reason: 'User management' },
    { pattern: /mv\s+.*\s+\//i, reason: 'Moving files to root' },
  ];

  public analyze(command: string): RiskAnalysisResult {
    for (const { pattern, reason } of this.highRiskPatterns) {
      if (pattern.test(command)) {
        return {
          isHighRisk: true,
          reason,
          riskLevel: 'high',
        };
      }
    }

    for (const { pattern, reason } of this.mediumRiskPatterns) {
      if (pattern.test(command)) {
        return {
          isHighRisk: true,
          reason,
          riskLevel: 'medium',
        };
      }
    }

    return {
      isHighRisk: false,
      riskLevel: 'low',
    };
  }

  public isHighRiskCommand(command: string): boolean {
    const result = this.analyze(command);
    return result.riskLevel === 'high' || result.riskLevel === 'medium';
  }
}

export const commandRiskAnalyzer = new CommandRiskAnalyzer();
